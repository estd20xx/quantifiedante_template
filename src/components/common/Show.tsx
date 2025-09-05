type Props = {
  isVisible: boolean
  children: React.ReactElement
}
const Show: React.FC<Props> = ({ isVisible, children }) => {
  return isVisible ? children : null
}

export default Show
