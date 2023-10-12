import { Helmet } from 'react-helmet';


const styles = {
    container: {
        minHeight: 'calc(100vh - 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 500,
        fontSize: 48,
        textAlign: 'center',
    },
};

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Phonebook App</title>
            </Helmet>
            <div style={styles.container}>
                <h1 style={styles.title}>
                    Phonebook aps welcome page{' '}
                    <span role="img" aria-label="Greeting icon">
                        💁‍♀️
                    </span>
                </h1>
            </div>
        </>
    );
}
