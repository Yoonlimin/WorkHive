import EditJobForm from "@/app/components/EditJobForm";
const getJobById = async (id) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      cache: "no-store", // Ensures fresh data is fetched
    });
    if (!res.ok) {
      throw new Error("Failed to fetch job");
    }
    return res.json(); // Returns the job data
  } catch (error) {
    console.log("Error loading job:", error);
  }
};
export default async function EditJob({ params }) {
  const { id } = params; // Extract the job ID from the params
  const { job } = await getJobById(id); // Fetch job data by ID
  const { companyName, jobTitle, jobDescription, skillsRequired, salaryPerMonth, workDuration, experienceLevel, deadline } = job; // Destructure the job fields
  return (
    <EditJobForm
      id={id}
      companyName={companyName}
      jobTitle={jobTitle}
      jobDescription={jobDescription}
      skillsRequired={skillsRequired}
      salaryPerMonth={salaryPerMonth}
      workDuration={workDuration}
      experienceLevel={experienceLevel}
      deadline={deadline}
    />
  );
}