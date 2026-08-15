import { useState } from "react";

import type { Elderly } from "../../data/elderlyList";
import { EditIcon, TrashIcon } from "./icons";

import * as S from "../../styles/Settings/ElderlyListCard";

const PAGE_SIZE = 5;

interface ElderlyListCardProps {
  elderlyList: Elderly[];
  onAddClick: () => void;
  onEditClick: (elderly: Elderly) => void;
  onDelete: (id: number) => void;
}

export default function ElderlyListCard({
  elderlyList,
  onAddClick,
  onEditClick,
  onDelete,
}: ElderlyListCardProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(elderlyList.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pagedList = elderlyList.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <S.Card>
      <S.HeaderRow>
        <S.CardTitle>어르신 목록</S.CardTitle>
        <S.AddButton type="button" onClick={onAddClick}>
          + 어르신 추가
        </S.AddButton>
      </S.HeaderRow>

      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <th>이름</th>
              <th>나이</th>
              <th>방 번호</th>
              <th>담당 요양보호사</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {pagedList.map((elderly) => (
              <tr key={elderly.id}>
                <td>{elderly.name}</td>
                <td>{elderly.age}세</td>
                <td>{elderly.roomNumber}</td>
                <td>{elderly.caregiver}</td>
                <td>
                  <S.ManageCell>
                    <S.IconButton
                      type="button"
                      aria-label={`${elderly.name} 수정`}
                      onClick={() => onEditClick(elderly)}
                    >
                      <EditIcon />
                    </S.IconButton>

                    <S.DeleteButton
                      type="button"
                      aria-label={`${elderly.name} 삭제`}
                      onClick={() => onDelete(elderly.id)}
                    >
                      <TrashIcon />
                    </S.DeleteButton>
                  </S.ManageCell>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrapper>

      <S.Pagination>
        <button
          type="button"
          aria-label="이전 페이지"
          disabled={currentPage === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            className={p === currentPage ? "active" : ""}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          aria-label="다음 페이지"
          disabled={currentPage === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          ›
        </button>
      </S.Pagination>

      <S.InfoNotice>
        <S.InfoIcon>i</S.InfoIcon>
        어르신을 삭제하면 해당 어르신의 이벤트 기록도 함께 삭제됩니다.
      </S.InfoNotice>
    </S.Card>
  );
}
