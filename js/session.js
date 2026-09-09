async function loadSessionData() {

    const session =
        localStorage.getItem("suporly-session");

    if (!session) {
        return null;
    }

    try {

        const response = await fetch(
            "https://suporly-backend.onrender.com/api/get_session_data",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    session: session
                })
            }
        );

        const data = await response.json();

        if (!data.success) {

            localStorage.removeItem(
                "suporly-session"
            );

            return null;
        }

        return data.success;

    } catch (error) {

        console.error(
            "Unable to validate session:",
            error
        );

        return null;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const sessionData =
            await loadSessionData();

        if (sessionData) {

            console.log(
                "Logged in as:",
                sessionData.username
            );

            console.log(
                "Session data:",
                sessionData
            );

        } else {

            console.log(
                "Not logged in."
            );
        }
    }
);