import { Helmet } from "react-helmet";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <Helmet>
                <meta
                    name="description"
                    content="There are described all of our comics"
                />
                <title>Comics list page</title>
            </Helmet>
            <ComicsList />
        </>
    )
}

export default ComicsPage;