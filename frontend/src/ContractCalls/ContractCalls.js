import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  stringUtf8CV,
  uintCV,
} from "@stacks/transactions";
import { userSession } from "../Stacks/ConnectWallet";

const ContractCallVote = () => {
  const { doContractCall } = useConnect()

  function vote(pick) {

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK",
      contractName: "example-fruit-vote-contract",
      functionName: "vote",
      functionArgs: [stringAsciiCV()],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <p>Vote via Smart Contract</p>
      <button className="Vote" onClick={() => vote("🍊")}>
        Vote for 🍊
      </button>
      <button className="Vote" onClick={() => vote("🍎")}>
        Vote for 🍎
      </button>
    </div>
  );
};

const ContractCallAddPatient = (props) => {

  const name = props.name
  const number = props.number
  const bloodgroup = props.bloodgroup

  console.log(name + " " + number + " " + bloodgroup)

  // ContractCallAddPatient(name, number, bloodgroup)

  // useConnect().doContractCall({
  //   network: new StacksTestnet(),
  //   anchorMode: AnchorMode.Any,
  //   contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
  //   contractName: "Prosper-3",
  //   functionName: "add-patient-info",
  //   functionArgs: [stringAsciiCV(name), uintCV(number), stringAsciiCV(bloodgroup)],
  //   postConditionMode: PostConditionMode.Deny,
  //   postConditions: [],
  //   onFinish: (data) => {
  //     console.log("onFinish:", data);
  //     window
  //       .open(
  //         `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
  //         "_blank"
  //       )
  //       .focus();
  //   },
  //   onCancel: () => {
  //     console.log("onCancel:", "Transaction was canceled");
  //   },
  // });

  return null;

}

function ContractCallAddPatient2(name, number, bloodgroup, doContractCall, navigate) {

  console.log(name + " " + number + " " + bloodgroup + " " + doContractCall)

  doContractCall({
    network: new StacksTestnet(),
    anchorMode: AnchorMode.Any,
    contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
    contractName: "Prosper-3",
    functionName: "add-patient-info",
    functionArgs: [stringAsciiCV(name), uintCV(number), stringAsciiCV(bloodgroup)],
    postConditionMode: PostConditionMode.Deny,
    postConditions: [],
    onFinish: (data) => {
      console.log("onFinish:", data);
      window
        .open(
          `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
          "_blank"
        )
        .focus();
        navigate("/patient-page")
    },
    onCancel: () => {
      console.log("onCancel:", "Transaction was canceled");
    },
  });

}

export { ContractCallVote, ContractCallAddPatient, ContractCallAddPatient2 };
