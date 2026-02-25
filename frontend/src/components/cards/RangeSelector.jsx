import { useSelector, useDispatch } from "react-redux"
import { setRange } from "../../features/dashboardSlice.js"

function RangeSelector() {
    const ranges = [
        {label: "this Week", value: "week"},
        {label: "this month", value: "month"},
        {label: "this year", value: "year"}
    ]

    const dispatch = useDispatch();
    const { range } = useSelector((state) => state.dashboard)
  return (
    <div className="flex bg-white p-1 rounded-xl ">
        {ranges.map((item) => (
            <button
                key = {item.value}
                onClick={() => dispatch(setRange(item.value))}
                className= {
                    `px-3 py-2 rounded-2xl text-sm font-medium 
                        ${
                            range === item.value
                                ?"bg-purple-300 text-gray-900 shadow-sm"
                                :"text-gray-900 hover:bg-gray-200"
                        }
                    `
                }
            >
                {item.label}
            </button>
        ))}
    </div>
  )
}

export default RangeSelector