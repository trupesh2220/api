import { LoadingButton } from '@mui/lab';
import { Box, Button, ButtonBase, Dialog, DialogContent, DialogTitle, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnqAutocomplete from 'src/components/comman/FormImputs/AnqAutocomplete';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormikCommanNew from 'src/components/comman/FormikCommanNew';
import { notifyError, notifySucc, requiredLabel } from 'src/utils/bulkComman';
import { ToastContainer } from 'react-toastify';
import { add_smstemplates, add_smsmenudata, sms_templatesdata, sms_editgetdata } from "src/redux/slices/manage ivr/smstemplate/templatesms"
import { getFullObjectFromValue } from 'src/utils/autocompleteUtils';
import { Formik } from 'formik';
import { useFormik } from 'formik';
import * as Yup from "yup";

const smsEncoding = [
    { value: 'Text', label: 'Text' },
    { value: 'Unicode', label: 'Unicode' },
    { value: 'Flash SMS', label: 'Flash SMS' },
    { value: 'Unicode Flash SMS', label: 'Unicode Flash SMS' },
]



const Smstemplateedit = (props) => {
    const { open, onClose, datafetch, user, formik } = props
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [getdata, setGetdata] = useState()
    const { isLoading, add_sms_menudata, getdataedit } = useSelector((state) => state.templatesms);
    console.log('getdataedit???', getdataedit)

    useEffect(() => {
        addmenudatasms()
    }, [dispatch])

    const addmenudatasms = async () => {
        let res = await dispatch(add_smsmenudata())
    }

    let senders_list = add_sms_menudata?.senders_list || [];
    let sms_type = add_sms_menudata?.sms_type || [];
    let template_list = add_sms_menudata?.template_list || [];

    console.log('template_list=======>', template_list)
    var smseditid = btoa(user);

    useEffect(async () => {
        editdata()
    }, [dispatch])

    const editdata = async () => {
        let res = await dispatch(sms_editgetdata(smseditid))
        console.log('res', res)
        setGetdata(getdataedit)
    }
    const onSubmit = async (data) => {
        console.log('data====>', data)
        let values = {
            name: data.name,
            sms_type: data.sms_type,
            sender: data.sender,
            sms_encoding: data.sms_encoding,
            sms_template_id: data.sms_template_id,
            sms_template: data.sms_template,
        }
        setLoading(true)
        try {
            let res = await dispatch(sms_templatesdata(smseditid, values))
            console.log('res', res)
            if (res.data.success === true) {
                notifySucc(res.data.message)
                onClose()
                datafetch()
                setLoading(false)
            } else {
                notifyError(res.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
    };

    const Smstemplateedit = (props) => {
        const { formik } = props
        console.log('formik.values====>', formik)

        useEffect(() => {
            if (getdataedit) {
                formik.setFieldValue('sender', getdataedit?.sender ? getdataedit?.sender : '')
                formik.setFieldValue('sms_template_id', getdataedit?.sms_template_id ? getdataedit?.sms_template_id : '')
            }
        }, [getdataedit])

        return (
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                name='name'
                                required
                                value={formik.values.name || name || ""}
                                onChange={(e) => {
                                    formik.setFieldValue("name", e.target.value)
                                }}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                label='Name'
                                style={{ marginTop: "10px" }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <AnqAutocomplete
                                name="sms_type"
                                disablePortal
                                disableClearable
                                options={sms_type}
                                value={formik.values.sms_type || getdataedit?.sms_type || ''}
                                onChange={((e, value) => {
                                    formik.setFieldValue("sms_type", value)
                                })}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        required
                                        label="SMS Type"
                                        name="sms_type"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        error={formik.touched.sms_type && Boolean(formik.errors.sms_type)}
                                        helperText={formik.touched.sms_type && formik.errors.sms_type}
                                    />
                                )}
                            />

                        </Grid>

                        <Grid item xs={12} md={12}>
                            <AnqAutocomplete
                                name="sender"
                                disablePortal
                                disableClearable
                                options={senders_list}
                                // value={formik.values.sender || getdataedit?.sender || ''}
                                value={getFullObjectFromValue(formik.values.sender, senders_list, "sender") || null}
                                getOptionLabel={(option) => option.sender}
                                onChange={((e, value) => {
                                    formik.setFieldValue("sender", value.sender)
                                })}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        required
                                        label="Sender Id"
                                        name="sender"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        error={formik.touched.sender && Boolean(formik.errors.sender)}
                                        helperText={formik.touched.sender && formik.errors.sender}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <AnqAutocomplete
                                label="Select SMS Encoding"
                                name="sms_encoding"
                                disablePortal
                                disableClearable
                                options={smsEncoding}
                                value={formik.values.sms_encoding}
                                onChange={((e, value) => {
                                    // console.log('value?????>>>', value)
                                    formik.setFieldValue("sms_encoding", value.value)
                                })}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        required
                                        name="sms_encoding"
                                        label="Select SMS Encoding"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        error={formik.touched.sms_encoding && Boolean(formik.errors.sms_encoding)}
                                        helperText={formik.touched.sms_encoding && formik.errors.sms_encoding}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <AnqAutocomplete
                                label="Select Template"
                                name="sms_template_id"
                                disablePortal
                                disableClearable
                                options={template_list}
                                getOptionLabel={(option) => option.name}
                                onChange={((e, value) => {
                                    formik.setFieldValue("sms_template_id", value.id)
                                })}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        required
                                        name="sms_template_id"
                                        label="Select Template"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        error={formik.touched.sms_template_id && Boolean(formik.errors.sms_template_id)}
                                        helperText={formik.touched.sms_template_id && formik.errors.sms_template_id}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                name="sms_template"
                                label="SMS Template"
                                value={formik.values.sms_template || getdataedit?.sms_template || ''}

                                onChange={(e) => {
                                    formik.setFieldValue("sms_template", e.target.value)
                                }}
                                error={formik.touched.sms_template && Boolean(formik.errors.sms_template)}
                                helperText={formik.touched.sms_template && formik.errors.sms_template}
                            />
                            <ul style={{ margin: "10px 20px", fontSize: "13px" }}>
                                <li><b>@agent_mobile</b>: {`if you use agent mobile number then you can write @agent_mobile instead of {#var#}`}</li>
                                <li><b>@caller_number</b>: {`if you use caller mobile number then you can write @caller_number instead of {#var#}`}</li>
                                <li><b>@admin_mobile</b>: {`if you use your mobile number then you can write @admin_mobile instead of {#var#}`}</li>
                            </ul>
                        </Grid>

                    </Grid>
                    <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 3 }}>
                        <Button color="inherit" variant="outlined" onClick={onClose}>
                            Close
                        </Button>
                        <LoadingButton type="submit" variant="contained">
                            Save Template
                        </LoadingButton>
                    </Stack>
                </Grid>
                <ToastContainer />
            </form>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle>
                <Grid container spacing={2} justifyContent={'space-between'} alignItems="center">
                    <Typography variant="subtitle1" p={2}>
                        Add SMS Template
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={onClose}
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <FormikCommanNew
                    loading={loading}
                    schema={{
                        name: yup.string('Enter your Template Name').required(' Template Name is required'),
                        // sms_type: Yup.string('Enter your Template Name').required(' Template Name is required'),
                        // sender: Yup.string('Enter your Template Name').required(' Template Name is required'),
                        // sms_encoding: Yup.string('Enter your Template Name').required(' Template Name is required'),
                        // sms_template_id: Yup.string('Enter your Template Name').required(' Template Name is required'),
                        sms_template: Yup.string('Enter your SMS Templates ').required('SMS Templates is required'),
                    }}
                    initialValuesProps={{
                        name: getdataedit?.name,
                        sms_type: getdataedit?.sms_type,
                        sender: getdataedit?.sender,
                        sms_encoding: getdataedit?.sms_encoding,
                        sms_template_id: getdataedit?.sms_template_id,
                        sms_template: getdataedit?.sms_template,

                    }}
                    onSubmitProps={async (values, { resetForm }) => {
                        onSubmit(values)
                    }}
                    Ch={Smstemplateedit}
                // data={getdataedit}
                />
            </DialogContent>
        </Dialog >
    );
};

export default Smstemplateedit;