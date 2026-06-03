document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
        document.querySelector("form");

        if(!form) return;

        form.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                alert(
                    "Thank you! Your message has been received."
                );

                form.reset();

            }
        );
    }
);
