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
        // Native event
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
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        } else {
            // react-select event
            // event is array of selected options or null
            const value = event ? event.map(opt => opt.value) : []
            setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: value }))
        }
    }

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
            </form>
        </section >
    )
}