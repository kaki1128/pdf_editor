import React, { useState } from "react";
import { Button, ButtonGroup, Grid, Toolbar } from "@mui/material";

function Nav({ buttonVariant }) {

    return (
        <Toolbar>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button
                    href="/"
                    variant={buttonVariant ? "contained" : "outlined"}
                >
                    <b>Setting</b>
                </Button>
                <Button
                    href="/preview"
                    variant={buttonVariant ? "outlined" : "contained"}
                >
                    <b>Preview</b>
                </Button>
            </ButtonGroup>
            {/* {console.log(buttonVariant, "testbu")} */}
        </Toolbar>
    )
}

export default Nav;