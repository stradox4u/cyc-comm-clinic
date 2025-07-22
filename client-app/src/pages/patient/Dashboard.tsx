import { useEffect } from "react";

function PatientDashboard () {


    useEffect(() => {
    }, []);

    return (
        <div>
            <section className="flex flex-row w-full mb-6 mt-16">
                Bio
            </section>
            <section className="w-full mb-6">
                Recent Vitals
            </section>
            <section className="w-full">
                Management Plan
            </section>
        </div>
    )
}

export default PatientDashboard;