//Step - 1
import {createSlice} from '@reduxjs/toolkit'

//Step - 2
const initialState = {
    count : 0
}

//NOTE const [count,setCount] = useState(0)

//Step - 3 

const counterSlice = createSlice({
    name : 'count',
    initialState,
    reducers :{
        increment : (state)=> {
            console.log(state)
            state.count += 1
        },
        decrement : (state) => {
            state.count -= 1
        }
    }
})

// step-4
//exports = > actions reducer
console.log(counterSlice)
console.log(counterSlice.actions)

export const {increment , decrement} = counterSlice.actions

export default counterSlice.reducer