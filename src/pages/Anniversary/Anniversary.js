import React from 'react';
import styled from 'styled-components';
import {
  tableSet,
  tableHeadSet,
  tableDataSet,
  bottomTableDataSet,
  flexSet,
  textInputSet,
  dateInputSet,
} from '../../styles/mixin';

const Anniversary = () => {
  return (
    <AnniversaryWrap>
      <ContentsWrap>
        <MainTitle>기념일을 등록해 주세요</MainTitle>
        <SubCopy>등록한 기념일은 3일전부터 홈 화면에 알려 드립니다 :)</SubCopy>
        <AnniversaryTable>
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <tr>
            <TableHead>기념일</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>삭제/수정</TableHead>
          </tr>
          <tr>
            <TableData>콧저씨생일</TableData>
            <TableData>2021-01-28</TableData>
            <TableData>
              {' '}
              <DeleteImage alt="delete" src="/icon/delete.png" />
              <EditImage alt="edit" src="/icon/edit.png" />
            </TableData>
          </tr>
          <tr>
            <TableData>
              <AnniversaryInput type="text" autoFocus />
            </TableData>
            <TableData>
              <DateInput type="date" />
            </TableData>
            <TableData>
              {' '}
              <EnrollButton>등록</EnrollButton>
            </TableData>
          </tr>
          <tr>
            <BottomTableData colSpan="3">
              신규 기념일 추가 <AddIcon alt="plus" src="/icon/add.png" />
            </BottomTableData>
          </tr>
        </AnniversaryTable>
      </ContentsWrap>
    </AnniversaryWrap>
  );
};

const AnniversaryWrap = styled.div`
  ${flexSet('column', 'flex-start', 'center')}
  height: 100vh;
  padding: 70px 0;
`;

const ContentsWrap = styled.div``;
const MainTitle = styled.div`
  margin-bottom: 40px;
  color: ${props => props.theme.basicDarkGray};
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`;

const SubCopy = styled.div`
  font-size: 16px;
  text-align: center;
`;

const AnniversaryTable = styled.table`
  ${tableSet('600px')}
`;
const TableHead = styled.th`
  ${tableHeadSet};
`;

const TableData = styled.td`
  ${tableDataSet};
`;

const BottomTableData = styled.td`
  ${bottomTableDataSet}
  cursor: pointer;
`;

const AddIcon = styled.img`
  width: 10px;
  opacity: 0.7;
`;

const DeleteImage = styled.img`
  width: 16px;
  margin-right: 5px;
  cursor: pointer;
  opacity: 0.8;
`;

const EditImage = styled.img`
  width: 16px;
  cursor: pointer;
  opacity: 0.8;
`;

const AnniversaryInput = styled.input`
  ${textInputSet}
`;

const DateInput = styled.input`
  ${dateInputSet}
`;

const EnrollButton = styled.span`
  cursor: pointer;
`;

export default Anniversary;
