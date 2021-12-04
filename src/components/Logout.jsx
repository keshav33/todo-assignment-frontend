import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import '../styles/notfound.css';

const Logout = () => {
    return (
        <div>
            <Grid padded centered>
                <Grid.Row columns={1}>
                    <Grid.Column width={12}>
                        <Segment className='notfoundContainer'>
                            <h2>
                                Thankyou For Logging In!
                            </h2>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Logout;