import Script from 'next/script'

const page = () => {
    return (
        <Script
            src="http://localhost:3000/widget.js"
            data-id="bad24036-6e10-49d6-9fbf-348cfaee4fdd"
            defer
        >
        </Script>
    )
}

export default page
