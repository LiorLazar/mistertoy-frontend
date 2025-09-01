import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
import { saveToy } from '../services/store/actions/toy.actions'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { useConfirmTabClose } from '../hooks/useConfirmTabClose'
import { TextField } from '@mui/material'

const EditToySchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),
    price: Yup.number()
        .required('Required'),
    labels: Yup.array()
        .min(1, 'Select at least one label')
        .of(Yup.string().required())
        .required('Required')
})

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const labels = useSelector(storeState => storeState.toyModule.toyLabels)
    const { toyId } = useParams()

    const isOnline = useOnlineStatus()
    const setHasUnsavedChanges = useConfirmTabClose()

    useEffect(() => {
        loadToy()
    }, [])

    function loadToy() {
        if (!toyId) return
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issues in toy edit:', err)
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
    }

    function handleChange({ target }) {
        const { name, value, type, checked } = target
        let fieldValue = value
        if (type === 'checkbox') {
            fieldValue = checked
        } else if (type === 'number') {
            fieldValue = +value
        } else if (type === 'select-multiple') {
            fieldValue = [...target.selectedOptions].map(option => option.value)
        }

        setToyToEdit(prevToy => ({
            ...prevToy,
            [name]: fieldValue
        }))
        setHasUnsavedChanges(true)
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot save toy')
            })
    }

    const priceValidations = {
        min: "1",
        required: true
    }

    function CustomInput(props) {
        return (
            <TextField {...props} variant="standard" />
        )
    }

    function formValidationClass(errors, touched) {
        const isError = !!Object.keys(errors).length
        const isTouched = !!Object.keys(touched).length
        if (!isTouched) return ''
        return isError ? 'error' : 'valid'
    }

    // console.log('toyToEdit.labels:', toyToEdit.labels)
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
            <Formik
                initialValues={{
                    name: toyToEdit.name,
                    price: toyToEdit.price,
                    labels: toyToEdit.labels
                }}
                validationSchema={EditToySchema}
                enableReinitialize={true}
            >
                {({ errors, touched, isValid, dirty, status }) => {
                    const validationClass = formValidationClass(errors, touched)
                    return (
                        <Form className={`formik ${validationClass}`}>
                            <Field as={CustomInput} label='name' name='name' onChange={handleChange} />
                            {errors.name && touched.name && (
                                <div className='errors'>{errors.name}</div>
                            )}
                            <Field as={CustomInput} label='price' name='price' type='number' onChange={handleChange} />
                            {errors.price && touched.price && (
                                <div className='errors'>{errors.price}</div>
                            )}
                            <Field
                                as="select"
                                name="labels"
                                multiple
                                value={toyToEdit.labels}
                                onChange={handleChange}
                            >
                                {labels.map(label => (
                                    <option key={label} value={label}>
                                        {label}
                                    </option>
                                ))}
                            </Field>
                            {errors.labels && touched.labels && (
                                <div className='errors'>{errors.labels}</div>
                            )}
                        </Form>
                    )
                }}
            </Formik>

            <section>
                <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
            </section>
        </section>
    )
}