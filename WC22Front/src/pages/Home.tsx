import '../styles/Home.scss';
import PageHeader from '../Components/PageHeader';

interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps> = () => {
    return (
        <div>
            <PageHeader headerText='Heavens Cup' />
            {/* structure page as slides containing image on the side*/}
            <div className='home'>
                <div className='home__slide'>
                    <div className='home__slide__content'>
                        <h1>Slide 1</h1>
                        <p>Slide 1 content</p>
                    </div>
                    <div className='home__slide__image'>
                        <img src='https://www.w3schools.com/howto/img_nature_wide.jpg' alt='slide 1' />
                    </div>
                </div>
                <div className='home__slide'>
                    <div className='home__slide__content'>
                        <h1>Slide 2</h1>
                        <p>Slide 2 content</p>
                    </div>
                    <div className='home__slide__image'>
                        <img src='https://www.w3schools.com/howto/img_snow_wide.jpg' alt='slide 2' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;