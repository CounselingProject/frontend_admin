import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Thead = styled.thead`
    background-color: #f1f1f1;
`;

const Th = styled.th`
    padding: 12px;
    border-bottom: 2px solid #ddd;
    font-weight: bold;
    text-align: left;
`;

const Td = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-weight: bold;
`;

const LoadingMessage = styled.div`
    color: #007bff;
    font-weight: bold;
`;

const MemberList = ({ memberList = [], loading, error, onEmailClick,onDeleteClick  }) => {
  const { t } = useTranslation();

  if (loading) {
    return <LoadingMessage>{t('로딩 중...')}</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{t(`오류 발생: ${error.message}`)}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <h1>{t('회원 목록')}</h1>
      <Table>
        <Thead>
          <Tr>
            <Th>{t('ID')}</Th>
            <Th>{t('회원유형')}</Th>
            <Th>{t('이름')}</Th>
            <Th>{t('이메일')}</Th>
            <Th>{t('휴댑전화번호')}</Th>
            <Th>{t('가입일')}</Th>
            <Th>{t('탈퇴일')}</Th>
            <Th>{t('회원탈퇴')}</Th>
          </Tr>
        </Thead>
        <tbody>
        {memberList.length > 0 ? (
          memberList.map((member) => (
            <Tr key={`member_${member.seq}`}>
              <Td>{member.seq}</Td>
              <Td>{member.userType}</Td>
              <Td>{member.userName}</Td>
              <Td onClick={() => onEmailClick(member)} style={{ cursor: 'pointer', color: 'green' }}>
                {member.email}
              </Td>
              <Td>{member.mobile}</Td>
              <Td>{member.createdAt}</Td>
              <Td>{member.deletedAt}</Td>
              <Td>
                <button onClick={() => onDeleteClick(member) } style={{ cursor: 'pointer'}}>{t('탈퇴')}</button>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan="4">{t('회원_목록이_없습니다.')}</Td>
          </Tr>
        )}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default React.memo(MemberList);
