import { AdvanceButton, DisabledButton, PreviousButton } from "./styles/Styles";

interface Props {
  nextDisabled: boolean;
  previousDisabled: boolean;
  onAdvanceClick: () => void;
  onPreviousClick: () => void;
}

export default ({
  nextDisabled,
  previousDisabled,
  onAdvanceClick,
  onPreviousClick,
}: Props) => {
  const onDisabledClick = () => console.log("tell them this is disabled");
  return (
    <>
      {previousDisabled ? (
        <DisabledButton onClick={onDisabledClick}>←</DisabledButton>
      ) : (
        <PreviousButton disabled={previousDisabled} onClick={onPreviousClick}>
          ←
        </PreviousButton>
      )}
      {nextDisabled ? (
        <DisabledButton onClick={onDisabledClick}>→</DisabledButton>
      ) : (
        <AdvanceButton onClick={onAdvanceClick}>→</AdvanceButton>
      )}
    </>
  );
};
