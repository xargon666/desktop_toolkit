interface ButtonProps {
  onClickFunc: any
  value: any
}

const MyButton = ({onClickFunc,value}:ButtonProps) => {
  return (
    <button onClick={()=>onClickFunc()}>{value}</button>
  )
}
export default MyButton
