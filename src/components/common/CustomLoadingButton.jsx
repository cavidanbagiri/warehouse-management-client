
import {useState} from 'react';
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save.js";

function CustomLoadingButton() {

    const [loading, setLoading] = useState(true);

    function handleClick() {
        setLoading(true);
    }

    return (
        <div>
            <LoadingButton
                color="secondary"
                onClick={handleClick}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
            >
                <span>Save</span>
            </LoadingButton>
        </div>
    )
}

export default CustomLoadingButton;