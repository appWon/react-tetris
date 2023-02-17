## 데모 영상

> 싱글 플레이

 <img src="https://velog.velcdn.com/images/app235naver/post/cbaf9dad-f81b-4e45-9270-eaea9361f74c/image.gif" width="300px">

> 멀티 플레이

## 사용법

> Tetris 게임은 키보드로 조작합니다. 아래는 각 키의 기능입니다.

← : 블록을 왼쪽으로 이동한다.

→ : 블록을 오른쪽으로 이동한다.

↓ : 블록을 아래로 이동한다.

↑ : 블록을 회전시킨다.

spacebar : 블록을 떨어뜨린다.

## 점수 계산법

> 1989년 Nintendo NES에서 사용된 오리지널 점수계산법을 사용하였습니다. [출처](https://tetris.fandom.com/wiki/Scoring)

| 레벨 | 1줄 클리어 | 2줄 클리어 | 3줄 클리어 | 4줄 클리어  |
| ---- | ---------- | ---------- | ---------- | ----------- |
| 0    | 40         | 100        | 300        | 1200        |
| 1    | 80         | 200        | 600        | 2400        |
| 2    | 120        | 300        | 900        | 3600        |
| n    | 40\*(n+1)  | 100\*(n+1) | 300\*(n+1) | 1200\*(n+1) |

## 기술 스택

> React, TypeScript, Redux, socket, styled-components, vite, yarn berry

## 프로젝트 구조

-   `/store/`는 게임에서 사용된 전역상태를 관리하는 코드
-   `/hooks/`는 플레이시 도형 및 동작기능을 hooks로 구현
-   `/components/` 서비스에 사용된 컴포넌트 저장
-   `/assets/` font 및 서비스 자원 저장
-   `/constance.ts`에는 게임에서 이용되는 테트로미노와 같은 상수를 관리
-   `/helpers.ts/`는 게임조작시 사용되는 상태 데이터 변경 및 조작시 필요한 계산을 도와주는 함수
-   `/types.ts` 개발에 사용되는 공통타입을 모아둔 파일

## 테트로미노

> 게임에서 떨어지는 도형인 `테트로미노`는 상수/constants.ts)에서 관리하고 있으며 랜덤으로 테트로미노 패턴 배열을 리턴합니다.

```typescript
// constants.ts
export const BLOCK_LIST = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    ...
];

// helpers.ts
export const getTetromino = ():BlockType[][] => {
    const color = getRandomColor();
    const randomBlock = Math.floor(Math.random() * BLOCK_LIST.length);

    return BLOCK_LIST[randomBlock]
        .filter((row) => row.some((v) => v))
        .map((row) =>
            row.map<BlockType>((cell) =>
                cell
                    ? {
                          state: "drop",
                          color,
                      }
                    : CellState
            )
        );
};

```

`getTetromino` 함수는 테트리미노 상수의 필요없는 데이터 열 제거 및 게임에 필요한 데이터 형태로 변경합니다.

## 렌더링 성능 최적화

<img src="https://velog.velcdn.com/images/app235naver/post/4d97549c-d469-4233-b7a1-b249e0a8ee23/image.png" width="200">

테트리스 게임은 키보드 입력 및 TimeInterval에 의해 state가 변경되면서 리렌더링이 발생하고 있습니다.

문제는 테트리스 board에는 가로( 12 ) x 세로( 24 ) = 288개의 `<Cell />` 컴포넌트가 위와 같은 이벤트가 발생할 경우 리렌더링이 발생하고 있습니다.

<img src="https://velog.velcdn.com/images/app235naver/post/243d101d-93e9-47f1-845c-f860f1904916/image.gif" width="500">

<img src="https://velog.velcdn.com/images/app235naver/post/d4b8a316-a214-4936-b29b-c200257a6318/image.gif" width="500">

테트리스 게임의 `<Cell>`컴포넌트는 2가지 상태를 가집니다.

1. 테트리미노에 의해 채워져 있는 경우
2. 비워져 있는 경우

위와 같은 상태는 라인 클리어, 게임 초기화 이벤트가 아니라면 동일한 props를 받기 때문에 `React.memo`를 사용하여 렌더링 최적화를 진행하였습니다.

<!-- -   `React.Memo` - 캐싱된 이전 데이터와 비교 후 다를 경우 렌더링 -->

<img src="https://velog.velcdn.com/images/app235naver/post/fc2a93d4-5a00-4ff8-80f8-f348892879ce/image.gif" width="500">

결과로는 props가 변경된 컴포넌트에서만 렌더링이 발생하는것을 볼 수 있었지만, memo와 같은 메모리를 소모하는 hook을 사용할 때는 트레이드 오프가 발생하니 좀더 신중하게 생각하고 사용해야할거 같습니다.
