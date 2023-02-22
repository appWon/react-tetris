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
export const TETROMINO_LIST = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    ...
];

// helpers.ts
export const getTetromino = () => {
    const color = getRandomColor();
    const randomBlock = Math.floor(Math.random() * TETROMINO_LIST.length);

    return TETROMINO_LIST[randomBlock].map((row) =>
        row.map((cell) => cell && color)
    );
};

```

`getTetromino` 함수는 테트리미노 상수의 필요없는 데이터 열 제거 및 게임에 필요한 데이터 형태로 변경합니다.

## 키보드 이벤트

> 테트로미노 조작을 위해서 `useKeyUp` hooks를 생성하여 키보드 이벤트를 처리하였습니다.

```typescript
// /hooks/useKeyUp.ts
export const useKeyUp = (
    callback: (e: KeyboardEvent) => void,
    deps?: DependencyList
) => {
    useEffect(() => {
        window.addEventListener("keyup", callback);
        return () => window.removeEventListener("keyup", callback);
    }, deps);
};
```

useKeyUp hooks의 첫번째 인자 callback 함수를 통하여 특정 키 입력 이벤트가 발생할 경우 분기 처리를 하였습니다.

```typescript
//hooks/useBlockState.ts
useKeyUp(
    ({ code }: KeyboardEvent) => {
        switch (code) {
            case "ArrowLeft":
                moveX(position.x + LEFT_OR_RIGHT.LEFT);
                break;

            case "ArrowRight":
                moveX(position.x + LEFT_OR_RIGHT.RIGHT);
                break;

            case "ArrowUp":
                rotateTetromino();
                break;

            case "ArrowDown":
                moveY();
                break;

            case "Space":
                hardDrop();
                break;

            default:
                return;
        }
    },
    [isPlaying, render]
);
```

### 키보드 이벤트 ERROR CASE

키보드 이벤트를 통해 테트리미노를 조작하였을 경우 여러 에러가 발생하였습니다.

-   좌우측 벽을 뚫을 경우

-   바닥을 뚫고 내려갈 경우

-   다른 블록과 중복

### Helper 함수

> 위와 같은 문제를 해결할 수 있는 `checkDuplicated` 함수는 입니다.

```typescript
//helper.ts
export const checkDuplicated = (
    position: RowWidth,
    tetromino: string[][],
    render: string[][]
) => {
    return tetromino
        .filter((row) => row.some((v) => v))
        .some((row, rowIndex) =>
            row.some((cell, columnIndex) => {
                const findRender =
                    render?.[rowIndex + position.y]?.[columnIndex + position.x];

                if (cell && findRender) return true;
                else if (cell && findRender === undefined) return true;
            })
        );
};
```

[Optional chaining](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 을 통해
render Array 범위를 벗어 났을 경우 반환하는 undefined 값을 활용하여 에러 케이스 해결할 수 있었습니다.

### 키 입력 이벤트 함수

> ↑ 키 입력을 했을 경우 회전시킵니다.

<img src="https://velog.velcdn.com/images/app235naver/post/af2aeff8-b294-4ec9-875c-680d854b8b54/image.gif" width="200">

[배열 회전 알고리즘](https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript)을 활용하여 회전 후 중복체크를 하였습니다.

```typescript
//hooks/useBlockState.ts
const rotateTetromino = (): void => {
    const roateTetromino = tetromino[0][0].map((_, index) =>
        tetromino[0].map((row) => row[index]).reverse()
    );

    if (checkDuplicated(position, roateTetromino, fixedRender)) {
        return;
    }

    dispatch(setTetromino([roateTetromino, ...tetromino.slice(1)]));
};
```

> ← → 키 입력을 했을 경우 좌우 이동합니다.

<img src="https://velog.velcdn.com/images/app235naver/post/d7621f4a-14ed-4997-9fdf-813a3820b4bf/image.gif" height="200px">

```typescript
//hooks/useBlockState.ts
const moveX = (x: number): void => {
    if (checkDuplicated({ ...position, x }, tetromino[0], fixedRender)) {
        return;
    }

    dispatch(setPosition({ x: x - position.x, y: 0 }));
};
```

> ↓ space 키 입력을 했을 경우 tetromino가 떨어 집니다.

<img src="https://velog.velcdn.com/images/app235naver/post/93f68fa5-db30-4d1e-8d07-78b11ee86214/image.gif" width="300px">

soft drop은 다음 1줄만 체크 후 동작하도록 합니다.

```typescript
//hooks/useBlockState.ts
const moveY = (): void => {
    if (!checkMoveY(1)) return;

    dispatch(setPosition({ x: 0, y: 1 }));
};
```

hard drop은 동일한 Check 함수를 1씩 증가 시켜가면서 실행한다.

```typescript
//hooks/useBlockState.ts
const hardDrop = (): void => {
    for (let h = 0; h <= ROW; h++) {
        if (!checkMoveY(h)) break;
    }
};
```

Y축에 사용하는 Check 함수이다. `checkDuplicated`함수를 사용해 중복 체크 후 true 일 경우 tetromino를 board에 적용한다.

board array는 2차원 배열이므로 인덱스에 접근하여 변경하면 원복 객체에도 적용이 되기 때문에 연결을 끊어주는 `깊은 복사`를 진행해야한다.

```typescript
//hooks/useBlockState.ts
const checkMoveY = (nextLine: number = 1): boolean => {
    if (
        checkDuplicated(
            { ...position, y: position.y + nextLine },
            tetromino[0],
            fixedRender
        )
    ) {
        const copyRender = drawRender(
            { ...position, y: position.y + nextLine - 1 },
            tetromino[0],
            _.cloneDeep(fixedRender)
        );

        const newNextTetromino = [...tetromino.slice(1), getTetromino()];

        setFixedRender(copyRender);
        dispatch(setResetPostion(INIT_POSITION));
        dispatch(setTetromino(newNextTetromino));
        return false;
    }

    return true;
};
```

## 렌더링 성능 최적화

### 1. React Memoization

<img src="https://velog.velcdn.com/images/app235naver/post/4d97549c-d469-4233-b7a1-b249e0a8ee23/image.png" width="200">

테트리스 게임은 키보드 입력 및 TimeInterval에 의해 state가 변경되면서 리렌더링이 발생하고 있습니다.

문제는 테트리스 board에는 `가로( 12 ) x 세로( 24 ) = 288개`의 `<Cell />` 컴포넌트가 위와 같은 이벤트가 발생할 경우 리렌더링이 발생하고 있습니다.

<img src="https://velog.velcdn.com/images/app235naver/post/243d101d-93e9-47f1-845c-f860f1904916/image.gif" width="500">

<img src="https://velog.velcdn.com/images/app235naver/post/d4b8a316-a214-4936-b29b-c200257a6318/image.gif" width="500">

테트리스 게임의 `<Cell>`컴포넌트는 2가지 상태를 가집니다.

1. 테트리미노에 의해 채워져 있는 경우
2. 비워져 있는 경우

위와 같은 상태는 라인 클리어, 게임 초기화 이벤트가 아니라면 동일한 props를 받기 때문에 `React.memo`를 사용하여 렌더링 최적화를 진행하였습니다.

<!-- -   `React.Memo` - 캐싱된 이전 데이터와 비교 후 다를 경우 렌더링 -->

<img src="https://velog.velcdn.com/images/app235naver/post/fc2a93d4-5a00-4ff8-80f8-f348892879ce/image.gif" width="500">

프로젝트의 테마가 `게임`이기 때문에 `React.memo`로 메모리를 소비해서 렌더링 최적화가 필요하다고 생각하고, 최적화 후 이벤트 발생부터 렌더링까지 최소 4~5배 성능 향상을 할 수 있었습니다.

<div   style="display:flex;" >
<img src="https://velog.velcdn.com/images/app235naver/post/3f6ef963-f995-44f7-8d81-08f07a8125ff/image.png" width="250">
<img src="https://velog.velcdn.com/images/app235naver/post/36166dc4-6298-44c4-bb0a-5337d1539432/image.png" width="250">
</div>

결과로는 props가 변경된 컴포넌트에서만 렌더링이 발생하는것을 볼 수 있었지만, memo와 같은 메모리를 소모하는 hook을 사용할 때는 트레이드 오프가 발생하니 좀더 신중하게 생각하고 사용해야할거 같습니다.

### 2. Don't use css in JS

테트리스를 만들면서 느낀것은 javascript에서 css라이브러리를 사용하지 말아야 합니다.

CSS in JS 라이브러리를 사용하면 스타일에 대한 코드량과 효율은 좋아지지만, 퍼포먼스적으로는 많이 떨어집니다.

저는 테트리스 개발에 CSS in JS 라이브러리 중 styled-components를 사용하기전과 후의 이벤트 렌더링 시간을 측정해봤습니다.

<div   style="display:flex;" >
<img src="https://velog.velcdn.com/images/app235naver/post/3f6ef963-f995-44f7-8d81-08f07a8125ff/image.png" width="250">
<img src="https://velog.velcdn.com/images/app235naver/post/183b244f-b368-4761-847b-81fa4b4dc3f3/image.png" width="250">
</div>

> 측정 데이터는 `React.memo` 최적화 후 추가적으로 테트리스 블럭이 쌓이는 Board 컴포넌트만 inline-style로 적용 후 테스트한 데이터입니다.

styled-components를 사용하면 라이브러리 내부적으로 많은 과정을 거치게 됩니다.

1. style 클래스를 중복되는 않는 값으로 해싱 후 생성 및 적용
2. nesting 기능 등... 위해 [`Stylis.js`](https://www.npmjs.com/package/stylis) 라이브러리 사용

위와 같은 작업으로 인해 높은 퍼포먼스를 보여줘야하는 프로젝트에서는 오히려 마이너스 효과를 주게되었습니다.

마지막으로... 더 높은 퍼포먼스를 나오기 위해선 react.js가 아닌 `vanila javascript` 로만 구현면될거 같습니다.
