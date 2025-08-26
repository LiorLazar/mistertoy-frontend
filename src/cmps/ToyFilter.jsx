import { useEffect, useRef, useState } from "react"
import Select from 'react-select'

import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ filterBy, onSetFilter, toyLabels }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        } else {
            value = type === 'number' ? +value : value
        }

        if (field === 'inStock') value = toyService.getInStockValue(value)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleLabelsChange(selectedOptions) {
        const value = selectedOptions ? selectedOptions.map(opt => opt.value) : []
        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: value }))
    }

    const { txt, inStock, labels } = filterByToEdit
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter / Sort:</h2>
            <form className="filter-form flex align-center">
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="Search"
                    value={txt}
                    onChange={handleChange}
                />
                <select name="inStock" id="inStock" value={inStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out Of Stock</option>
                </select>
                <label htmlFor="labels"> Labels:</label>
                {toyLabels && toyLabels.length > 0 &&
                    <Select
                        isMulti
                        name="labels"
                        options={toyLabels.map(label => ({ value: label, label }))}
                        className="basic-multi-select toy-label-select"
                        classNamePrefix="select"
                        value={labels.map(label => ({ value: label, label }))}
                        onChange={handleLabelsChange}
                    />
                }
            </form>
        </section >
    )
}