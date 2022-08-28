import React from 'react'
// import BarLoader from 'react-spinners/BarLoader'
import styled from 'styled-components'

const loadingComponent = () => {
    return (
        <Container>
            <div color="#252727" width="200px" size="15px">Loading</div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default loadingComponent
