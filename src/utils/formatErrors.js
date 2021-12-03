export const formatError = (err) => {
    if (err?.response?.data?.message) {
        return err.response.data.message;
    }
    return 'Something Went Wrong!'
}