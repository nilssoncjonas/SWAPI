import starWars from '../../public/star-wars-intro.svg'
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"

const Intro = () => {
	return (
		<>
			<Container className='intro-container'>
				<Image src={starWars} fluid className='mx-auto d-block'/>
				<p className='intro-text'>
					BB-8 has assigned you the task of creating a Star Wars encyclopedia so that he can avoid being a rolling
					reference book and focus on more important things, like rolling around and not constantly answering silly
					questions.
					He wants his team to easily find information about everything in the Star Wars universe.
					Your important mission is to create this encyclopedia and help bring peace to the galaxy!
				</p>
			</Container>
		</>
	)
}
export default Intro