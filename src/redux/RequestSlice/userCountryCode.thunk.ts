import { setUserCountryCode} from "./request.slice";

export const asyncUserCountryCodeRequest = (dispatch: any) => {
    return async (dispatch: any) => {
        try {
            await
                fetch('https://api.bigdatacloud.net/data/reverse-geocode-client',  )
                    .then(response => response.json())
                    .then(response => {dispatch(setUserCountryCode(response)) })
                    .catch(err => console.error(err));
        }
        catch (e) {
            console.log(e)
        }
    }
}
