import { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  border-radius: 20px;
  position: relative;
  grid-gap: 15px;
`;
const Makecenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  width: 100%;
  height: 70px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => (props.select ? "blue" : "var(--color-border)")};
  border: ${(props) => (props.select ? "2px" : "1px")} solid
    ${(props) => (props.select ? "blue" : "var(--color-border)")};
  position: relative;
`;

const CheckCircle = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: -7.5px;
  right: -7.5px;
  border-radius: 100%;
  background-color: blue;
  opacity: ${(props) => (props.select ? "1" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: white;
`;

const Education = ({ data, educationData, detail, setDetail }) => {
  useEffect(() => {
    {
      setDetail({
        idx: data.idx,
        name: data.name,
      });
    }

    return;
  }, []);

  const selectBtnHandler = (idx, name) => {
    setDetail({
      idx: parseInt(idx),
      name,
    });
  };

  return (
    <Container>
      {detail &&
        educationData &&
        educationData.map((e) => (
          <Makecenter key={e.idx}>
            <Button
              onClick={() => selectBtnHandler(e.idx, e.name)}
              select={detail.name === e.name}
              data-select={detail.name === e.name}
              type="button"
              id={e.idx}
              className="korean"
            >
              <CheckCircle select={detail.name === e.name}>
                <FontAwesomeIcon icon={faCheck} />
              </CheckCircle>
              {e.name}
            </Button>
          </Makecenter>
        ))}
    </Container>
  );
};

export default Education;
