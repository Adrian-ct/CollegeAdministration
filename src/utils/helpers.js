import InfoCardCourse from "../components/InfoCardCourse";
import InfoCardProfessor from "../components/InfoCardProfessor";
import InfoCardStudent from "../components/InfoCardStudent";
import AddCourseModal from "../components/modals/AddCourseModal";
import AddProfessorModal from "../components/modals/AddProfessorModal";
import AddStudentModal from "../components/modals/AddStudentModal";
import CourseModal from "../components/modals/CourseModal";
import ProfessorModal from "../components/modals/ProfessorModal";
import StudentModal from "../components/modals/StudentModal";

export const getUrl = (url) => {
  switch (url) {
    case "Students":
      return "https://localhost:7280/api/Students";
    case "Professors":
      return "https://localhost:7280/api/Professors";
    case "Courses":
      return "https://localhost:7280/api/Subjects";
    default:
      break;
  }
};

export const getEntityType = (url, x) => {
  switch (url) {
    case "Students":
      return <InfoCardStudent data={x} />;
    case "Professors":
      return <InfoCardProfessor data={x} />;
    case "Courses":
      return <InfoCardCourse data={x} />;
    default:
      break;
  }
};

export const getModalType = (type) => {
  switch (type) {
    case "Students":
      return <StudentModal />;
    case "Professors":
      return <ProfessorModal />;
    case "Courses":
      return <CourseModal />;
    default:
      break;
  }
};

export const getAddModalType = (type) => {
  switch (type) {
    case "Students":
      return <AddStudentModal />;
    case "Professors":
      return <AddProfessorModal />;
    case "Courses":
      return <AddCourseModal />;
    default:
      break;
  }
};
