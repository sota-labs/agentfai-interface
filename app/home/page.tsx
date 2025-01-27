import AppTabs, { TabsProps } from '@/components/AppTabs';
import TabAgentChan from '@/components/home/TabAgentChan';

const Home = () => {
  const tabsItem: TabsProps[] = [
    {
      key: '1',
      label: "Hi, I'm Agent Chan",
      content: <TabAgentChan />,
    },
    {
      key: '2',
      label: 'Wallet',
      content: <></>,
    },
    {
      key: '3',
      label: 'Tweets',
      content: <></>,
    },
    {
      key: '4',
      label: 'Memories',
      content: <></>,
    },
    {
      key: '5',
      label: 'Uploads',
      content: <></>,
    },
    {
      key: '6',
      label: 'Email',
      content: <></>,
    },
    {
      key: '7',
      label: 'Task',
      content: <></>,
    },
  ];
  return <AppTabs tabs={tabsItem} />;
};

export default Home;
