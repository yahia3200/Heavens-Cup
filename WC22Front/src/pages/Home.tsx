import '../styles/Home.scss';
import PageHeader from '../Components/PageHeader';

interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps> = () => {
    return (
        <div>
            <PageHeader headerText='Home' />
        </div>
    );
}

export default Home;