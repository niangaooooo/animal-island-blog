import { Divider, Icon, Title } from "animal-island-ui";
import { UtterancesComments } from "../components/UtterancesComments";

const guestbookUrl = "https://github.com/niangaooooo/animal-island-blog/issues/1";

export function GuestbookPage() {
  return (
    <div className="page-wrap guestbook-page">
      <section className="page-hero page-hero--compact guestbook-hero">
        <div className="page-hero__icons" aria-hidden="true">
          <Icon item={300} size={52} bounce />
          <Icon name="icon-chat" size={42} bounce />
        </div>
        <h1>岛民留言板</h1>
        <p>路过小岛时，留下一句话吧。问候、建议或今天的心情，都会被海风好好收下。</p>
      </section>

      <Divider type="wave-yellow" />

      <section className="page-section guestbook-section">
        <div className="guestbook-section__heading">
          <div>
            <Title color="app-teal">海岸留言簿</Title>
            <p>每一条来信都会公开留在这本留言簿里。</p>
          </div>
          <a href={guestbookUrl} target="_blank" rel="noreferrer" className="guestbook-external-link">
            <Icon name="icon-chat" size={18} bounce />
            在 GitHub 打开
          </a>
        </div>

        <div className="guestbook-board">
          <UtterancesComments />
        </div>
      </section>
    </div>
  );
}
