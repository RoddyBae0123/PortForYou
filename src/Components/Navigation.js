import { useState, memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
`;

const Navbar = styled.div`
  /* border-bottom: 1px solid lightgray; */
  display: grid;
  grid-template-columns: 75% 25%;
  background-color: white;
  height: 80px;
  border-radius: 15px;
`;

const AddZone = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Ul = styled.ul`
  display: grid;
  height: 100%;
  transform: translateY(-1%);
  grid-template-columns: repeat(auto-fill, 100px);
  list-style: none;
  padding: 0 30px;
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) =>
    props.checked ? "2px solid var( --color-text-ver5)" : "none"};
  opacity: ${(props) => (props.checked ? 1 : 0.5)};
`;

const Change = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-text-ver5);
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  height: 150px;
  width: 100%;
`;

const PageUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  height: 100%;
  list-style: none;
`;

const PageLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PageBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: var(--color-theme);
  opacity: ${(props) => (props.checked ? 1 : 0.5)};
`;

const Navigation = ({ navbar, change, data, additup }) => {
  const clonedeep = require("lodash.clonedeep");

  const [st, setSt] = useState();
  const copy = [];
  useState(() => {
    navbar &&
      navbar.map((e) => {
        copy.push(
          data.kind.toLowerCase() === e.name.toLowerCase()
            ? { checked: true }
            : { checked: false }
        );
      });
    setSt(copy);
  }, []);
  const setChecked = (idx) => {
    console.log(typeof navbar[idx].query);
    const copy = clonedeep(st);
    copy.map((e) => (e.checked = false));
    change &&
      change({
        pno: 1,
        kind: navbar[idx].name.toLowerCase(),
        query:
          typeof navbar[idx].query == "string" ? navbar[idx].query : "hello",
      });
    copy[idx].checked = true;
    // console.log(navbar[idx].page.lastPno);
    setSt(copy);
  };
  const changePage = (e) => {
    change &&
      change({
        pno: parseInt(e.target.innerHTML),
        kind: e.target.dataset.value.toLowerCase(),
      });
  };

  const returnPage = (state, data) => {
    const newArray = [];
    for (let i = 0; i < data.lastPno; i++) {
      newArray.push(i);
    }
    return state ? (
      <Page>
        <PageUl>
          {newArray.map((e) => (
            <PageLi>
              <PageBtn
                data-value={data.name}
                checked={data.pno == e + 1}
                onClick={changePage}
                className="basic"
              >
                {e + 1}
              </PageBtn>
            </PageLi>
          ))}
        </PageUl>
      </Page>
    ) : null;
  };
  const returnNavbar = () => (
    <Container>
      {st && (
        <>
          <Navbar>
            <Ul>
              {navbar.map((e, idx) => (
                <Li key={e.idx} id={idx} checked={st[idx].checked}>
                  <Change
                    id={idx}
                    onClick={() => setChecked(idx)}
                    className="basic"
                  >
                    {e.name}
                  </Change>
                </Li>
              ))}
            </Ul>
            <AddZone>{additup && additup(true)}</AddZone>
          </Navbar>
          <Contents>
            {navbar.map((e, idx) => e.component(st[idx].checked))}
            {navbar &&
              navbar.page &&
              navbar.map((e, idx) =>
                returnPage(st[idx].checked, {
                  lastPno: e.page.lastPno,
                  pno: e.page.pno,
                  name: e.name,
                })
              )}
          </Contents>
        </>
      )}
    </Container>
  );
  //   <Navbar onclick={() => returnContents()}></Navbar>;

  return navbar ? returnNavbar() : <div>No data bro</div>;
};

export default memo(Navigation);
