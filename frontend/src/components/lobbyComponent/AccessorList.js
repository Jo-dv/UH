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
    <div className="m-1 overflow-y-scroll h-[34vh]">
      <div className="w-1/2 stretch m-3 ">
        {accessors.map((accessor, i) =>
          nickname === accessor.nickname ? null : (
            <div className="ml-3 mb-1" ref={accessorRefs.current[i]} key={i}>
              {accessor.nickname}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AccessorsList;
