import { useEffect, useRef, useState } from "react"
import Select from 'react-select'

import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter, labels }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange(event) {
        if (event && event.target) {
            const field = event.target.name
            let value = event.target.value

            switch (event.target.type) {
                case 'number':
                case 'range':
                    value = +value || ''
                    break
                case 'checkbox':
                    value = event.target.checked
                    break
                default:
                    break
            }

            if (field === 'sortBy' && value) {
                const sortObject = JSON.parse(value)
                setFilterByToEdit(prevFilter => ({
                    ...prevFilter,
                    sortBy: {
                        sortField: sortObject.sortField,
                        sortDir: sortObject.sortDir
                    }
                }))
            } else if (field === 'sortBy' && !value) {
                setFilterByToEdit(prevFilter => ({
                    ...prevFilter,
                    sortBy: null
                }))
            } else {
                setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
            }
        } else {
            const value = event ? event.map(opt => opt.value) : []
            setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: value }))
        }
    }

    const sortOptions = [
        { sortField: 'name', sortDir: 1, label: 'Name (A-Z)' },
        { sortField: 'name', sortDir: -1, label: 'Name (Z-A)' },
        { sortField: 'price', sortDir: 1, label: 'Price (Low-High)' },
        { sortField: 'price', sortDir: -1, label: 'Price (High-Low)' },
        { sortField: 'createdAt', sortDir: 1, label: 'Date (Oldest)' },
        { sortField: 'createdAt', sortDir: -1, label: 'Date (Newest)' }
    ]

    const { txt, isStock } = filterByToEdit
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter:</h2>
            <form>
                <label htmlFor="txt">Name:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By Name"
                    value={txt || ''}
                    onChange={handleChange}
                />
                <label htmlFor="isStock"> Stock Status:</label>
                <select name="isStock" id="isStock" value={isStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out Of Stock</option>
                </select>
                <label htmlFor="labels"> Labels:</label>
                <Select
                    defaultValue=''
                    isMulti
                    name="labels"
                    options={labels}
                    className="basic-multi-select toy-label-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                ></Select>

                <label htmlFor="sortBy">Sort By:</label>
                <select
                    className="sortBy"
                    name="sortBy"
                    id="sortBy"
                    value={filterByToEdit.sortBy ? JSON.stringify(filterByToEdit.sortBy) : ''}
                    onChange={handleChange}
                >
                    <option value="">Select Sort Option</option>
                    {sortOptions.map((option, index) => (
                        <option key={index} value={JSON.stringify({ sortField: option.sortField, sortDir: option.sortDir })}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </form>
        </section >
    )
}