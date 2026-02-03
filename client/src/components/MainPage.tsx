import NavigationSidebar from "./NavigationSidebar/navigationSidebar.tsx";
import MainContent from "./MainContent/mainContent.tsx";
import WidgetsSidebar from "./WidgetsSidebar/widgetsSidebar.tsx";
import TweetContainerDetails from "./MainContent/MainContentComponents/TweetDetails/TweetContainerDetails.tsx";

interface MainPageProps {
  tweetDetails: boolean;
}

const MainPage = ({tweetDetails}: MainPageProps) => {
  return (
    <div className="bg-twitterDarkBackgroud text-twitterText flex h-full w-screen grid-rows-1 flex-row">
      <header className="flex flex-grow justify-end">
        <div className="w-[70px] xl:w-[275px]">
          <NavigationSidebar />
        </div>
      </header>
      <div className="min-h-screen w-[600px] shrink-0 border-x border-twitterOutliner">
        {tweetDetails ? <TweetContainerDetails /> : <MainContent /> }
      </div>
      <aside className="hidden flex-grow items-start justify-start lg:flex">
        <div className="w-[350px] pl-4">
          <WidgetsSidebar />
        </div>
      </aside>
    </div>
  );
};

export default MainPage;
