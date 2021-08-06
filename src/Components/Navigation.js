import { useState, memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 85%;
`;

const Navbar = styled.div`
  border-bottom: 1px solid lightgray;
`;

const Ul = styled.ul`
  display: grid;
  height: 50px;
  transform: translateY(-1%);
  grid-template-columns: repeat(auto-fill, 100px);
  list-style: none;
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => (props.checked ? "1.5px solid black" : "none")};
  opacity: ${(props) => (props.checked ? 1 : 0.1)};
`;

const Change = styled.button`
  border: none;
  background-color: transparent;
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
  height: 50px;
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

const Navigation = ({ navbar, change, data }) => {
  const clonedeep = require("lodash.clonedeep");

  const [st, setSt] = useState();
  const copy = [];
  useState(() => {
    navbar &&
      navbar.map((e) => {
        copy.push(
          data.kind === e.name.toLowerCase()
            ? { checked: true }
            : { checked: false }
        );
      });
    setSt(copy);
  }, []);

  const setChecked = (idx) => {
    const copy = clonedeep(st);
    copy.map((e) => (e.checked = false));
    change && change({ pno: 1, kind: navbar[idx].name.toLowerCase() });
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
    console.log(data);
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
              >
                {e + 1}
              </PageBtn>
            </PageLi>
          ))}
        </PageUl>
      </Page>
    ) : null;
  };
  navbar && navbar.map((e) => console.log(e));

  const returnNavbar = () => (
    <Container>
      {st && (
        <>
          <Navbar>
            <Ul>
              {navbar.map((e, idx) => (
                <Li key={e.idx} id={idx} checked={st[idx].checked}>
                  <Change id={idx} onClick={() => setChecked(idx)}>
                    {e.name}
                  </Change>
                </Li>
              ))}
            </Ul>
          </Navbar>
          <Contents>
            {navbar.map((e, idx) => e.component(st[idx].checked))}
            {navbar &&
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
