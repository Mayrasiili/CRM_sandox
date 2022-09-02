import { Loader } from '@mantine/core';

const Loading = props => {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Loader size="xl" variant="dots" />
        </div>
    )
}

export default Loading
