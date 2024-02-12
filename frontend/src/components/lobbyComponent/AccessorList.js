import React, { useEffect } from "react";
import useAccessors from "../../hooks/useAccessors";
import UseAccessorsStore from "../../store/UseAccessorsStore";
import useStore from "../../store/UserAuthStore";

const AccessorsList = () => {
  const { accessorRefs } = useAccessors();
  const { accessors } = UseAccessorsStore();
  const nickname = useStore((state) => state.user.userNickname);
  // accessorRefs를 업데이트합니다.
  useEffect(() => {
    accessorRefs.current = accessors.map((_, i) => accessorRefs.current[i] || React.createRef());
  }, [accessors]);

  return (
    <div className="p-[16px] overflow-y-scroll h-full scroll-smooth">
      <div className="">
        {accessors.map((accessor, i) =>
          nickname === accessor.nickname ? null : (
            <div className="ml-[12px] mb-[4px] text-l" ref={accessorRefs.current[i]} key={i}>
              {accessor.nickname}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AccessorsList;
