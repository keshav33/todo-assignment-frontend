import React from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom'; 
import '../styles/notfound.css';

const Notfound = () => {
    const history = useHistory();
    return (
        <div>
            <Grid padded centered>
                <Grid.Row columns={1}>
                    <Grid.Column width={12}>
                        <Segment className='notfoundContainer'>
                            <h2>
                                Oops.....! This Page Is Not Available
                            </h2>
                            <p>
                                Please Route To Some Other Page :)
                            </p>
                                <Button primary onClick={() => history.push('/')}>
                                    Click Here To Redirect To Home
                                </Button>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Notfound;