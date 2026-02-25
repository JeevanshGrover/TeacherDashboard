import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, setSelectedTeacher } from "../features/teacherSlice.js";
import { useNavigate } from "react-router-dom";

export default function TeachersList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loadingList } = useSelector(
    (state) => state.teachers
  );

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">
        Teachers
      </h1>

      {loadingList ? (
        <p>Loading teachers...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">

          {list.map((teacher) => (
            <div
              key={teacher.teacher_id}
              onClick={() => {
                dispatch(setSelectedTeacher(teacher.teacher_id));
                navigate(`/teachers/${teacher.teacher_id}`);
              }}
              className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">
                {teacher.teacher_name}
              </h3>
            </div>
          ))}

        </div>
      )}
    </>
  );
}