import { 
    Textfield,
    Button,
    Label,
    Form,
    FormFooter,
    FormHeader,
    FormSection,
    ErrorMessage,
    Stack,
    Box,
    useForm
 } from '@forge/react';
 import { useGHTokenSaving } from '../../hooks/useGhToken'

export const GHTokenForm = () => {
    const { handleSubmit, register, getFieldId, formState } = useForm();
    const { isSaving, saveToken, error } = useGHTokenSaving();

    return (
        <Form onSubmit={handleSubmit((data) => saveToken({token: data.token}))}>
            <FormHeader title="Save GH Token" />
            <FormSection>
                <Stack space="space.100">
                    <Box xcss={{maxWidth: '400px'}}>
                        <Label labelFor={getFieldId("token")}>GH Token</Label>
                        <Textfield {...register("token", { minLength: 40 })} />
                        {formState.errors.textfield && (
                        <ErrorMessage>Minimum 40 characters required</ErrorMessage>)}
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </Box>
                </Stack>
            </FormSection>
            <FormFooter align="start">
                <Button isDisabled={isSaving} appearance="primary" type="submit">
                Submit
                </Button>
            </FormFooter>
        </Form>
    );
}