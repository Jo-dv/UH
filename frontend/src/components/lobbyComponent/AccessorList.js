import React, { useEffect, useState, useRef } from "react";
import useAccessors from "../../hooks/useAccessors";
import UseAccessorsStore from "../../store/UseAccessorsStore";
import useStore from "../../store/UserAuthStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const AccessorsList = () => {
  const { accessorRefs } = useAccessors();
  const { accessors } = UseAccessorsStore();
  const { requestFriends } = useLobbyApiCall();
  const [accessorDropdown, setAccessorDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccessorDropdown(null); // 드롭다운을 닫음
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 접속자 드롭다운
  const accessorClick = (accessor) => {
    if (accessorDropdown === accessor.nickname) {
      setAccessorDropdown(null);
    } else {
      setAccessorDropdown(accessor.nickname);
    }
  };

  const nickname = useStore((state) => state.user.userNickname);
  // accessorRefs를 업데이트합니다.
  useEffect(() => {
    accessorRefs.current = accessors.map((_, i) => accessorRefs.current[i] || React.createRef());
  }, [accessors]);

  return (
    <div className="p-[16px] overflow-y-scroll h-full scroll-smooth">
      <div className="">
        {accessors && accessors.map((accessor, i) =>
          nickname === accessor.nickname ? null : (
            <div className="ml-[12px] mb-[4px] text-l" ref={accessorRefs.current[i]} key={i}>
              <div className="relative inline-block">
                <button
                  onClick={() => accessorClick(accessor)}
                  aria-expanded={accessorDropdown === accessor ? "true" : "false"}
                  aria-haspopup="true"
                >
                  {accessor.nickname}
                </button>
                {accessorDropdown === accessor.nickname && (
                  <div ref={dropdownRef} className="absolute ml-5 z-10 w-[87px] bg-white bg-opacity-95 rounded-2xl border-gray-200 border shadow-lg ">
                    <button className="text-gray-700 text-sm block px-4 py-1 w-full text-left hover:bg-gray-100 rounded-2xl" onClick={() => requestFriends(accessor.userSeq)}>친구요청</button>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AccessorsList;
