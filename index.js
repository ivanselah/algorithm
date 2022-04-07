const input = 3;
// output = 1 + 2 + 3, 6

function specialFunc(input) {
  if (input < 0 || input === 0) return;
  let sumResult = 0;
  for (let i = 0; i <= input; i++) {
    sumResult += i;
  }
  return sumResult;
}

let t1 = performance.now();
specialFunc(100000000);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);

function specialFunc(n) {
  return (n * (n + 1)) / 2;
}

/**
 * 룸 이름을 변경할 때 사용
 * @param {*} roomNameValue 사용자가 입력한 roomName
 */
const changeRoomName = (roomNameValue) => {
  const parseMapObjectPosition = JSON.parse(mapInformation.spaceJson);
  setMapInformation(() => {
    return {
      ...mapInformation,
      spaceJson: JSON.stringify({
        ...parseMapObjectPosition,
        rooms: parseMapObjectPosition.rooms.map((room) => {
          if (room.id === currentRoom.id) {
            return {
              ...room,
              name: roomNameValue,
            };
          }
          return room;
        }),
      }),
    };
  });
  setCurrentRoom({ ...currentRoom, name: roomNameValue });
};

const changeRoom = (room = required('room'), isDelete = false, fromPortal = false) => {
  if (!room.id && !room.name && !room.spaceJson) {
    throwError('room is wrong');
  }
  if (room.id === currentRoom.id) {
    return;
  }
  TileActiveHandle();
  if (isDelete) {
    setDeleteBtnVisible(true);
  }
  if (!fromPortal) {
    const spaceJson = saveRoom(extractSpaceJson());
    // argument room => 변경로직감지에 사용
    saveButton(spaceJson, currentRoom.id, room);
  }
  const roomData = JSON.parse(mapInformation.spaceJson);
  if (room.id === 0 || roomData.rooms.length === 1) {
    setDeleteBtnVisible(false);
  }
  cursorCheck('stamp');
  setCurrentRoom({ name: room.name, spaceJson: room.spaceJson, id: room.id });

  const foundRoom = roomData.rooms.find((room_) => room_.id === room.id);
  if (foundRoom != null) loadSpaceJson(foundRoom.spaceJson, { name: foundRoom.name, id: foundRoom.id });
};
