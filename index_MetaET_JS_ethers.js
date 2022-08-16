var provider;
var signer;
// var userAddress;

var accounts = [];
var currentAccount;

var contract_MetaET;
var contract_DropTokens;
var address_MetaET = "0x604dc970db5b31459e09956a5005ae68d0f75d45";
var address_DropTokens = "0xbd7e10d22a0da662fb34fe25fd15f7840b45ffa2";
var abi_MetaET = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
			},
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleRevoked",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Unpaused",
		type: "event",
	},
	{
		stateMutability: "nonpayable",
		type: "fallback",
	},
	{
		inputs: [],
		name: "BLACKLIST_L_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "BLACKLIST_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "BLACKLIST_R_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "DROPER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "FINANCER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "MANAGER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "MINTER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "_DROP_FINISH",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "_DROP_PERIOD",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "_DROP_RELEASE_END",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "_DROP_RELEASE_START",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "_DROP_ROUNDS",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "_DROP_START",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "_index",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "_meter",
		outputs: [
			{
				internalType: "uint256",
				name: "pushTotal",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "popTotal",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "_timer",
		outputs: [
			{
				internalType: "uint256",
				name: "finish",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "start",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "end",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "burn",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "burnFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "cap",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "subtractedValue",
				type: "uint256",
			},
		],
		name: "decreaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "getRoleMember",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleMemberCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "addedValue",
				type: "uint256",
			},
		],
		name: "increaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4",
			},
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		stateMutability: "payable",
		type: "receive",
		payable: true,
	},
	{
		inputs: [],
		name: "contractSendValue",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "target",
				type: "address",
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "contractFunctionCallWithValue",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "token",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "contractSafeTransferERC20",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "token",
				type: "address",
			},
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "contractSafeTransferFromERC20",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "mint",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "pause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "unpause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "bytes32",
				name: "adminRole",
				type: "bytes32",
			},
		],
		name: "setRoleAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "id",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "start",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "end",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "finish",
				type: "uint256",
			},
		],
		name: "setDropTimerData",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getDropTimerData",
		outputs: [
			{
				internalType: "uint256[]",
				name: "ids",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "finishs",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "starts",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "ends",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
		],
		name: "balanceDropOf",
		outputs: [
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
		],
		name: "balanceDropReleaseableOf",
		outputs: [
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "selfDestroy",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
var abi_DropTokens = [
	{
		inputs: [
			{
				internalType: "address",
				name: "dropUnderlying_",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "referrer",
				type: "address",
			},
		],
		name: "Airdrop",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "buyer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "buyValueOfEth",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "referrer",
				type: "address",
			},
		],
		name: "Ido",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
			},
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleRevoked",
		type: "event",
	},
	{
		stateMutability: "nonpayable",
		type: "fallback",
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "FINANCER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "IDO_ratio",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "IDO_referrer_ratio",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "MANAGER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "airdrop_num",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "airdrop_referrer_num",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address",
			},
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "airdroped",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "dropUnderlying",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "getRoleMember",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleMemberCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "referral",
		outputs: [
			{
				internalType: "uint256",
				name: "invited",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "reward",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "referrer",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4",
			},
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		stateMutability: "payable",
		type: "receive",
		payable: true,
	},
	{
		inputs: [],
		name: "contractSendValue",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "target",
				type: "address",
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "contractFunctionCallWithValue",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "token",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "contractSafeTransferERC20",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "token",
				type: "address",
			},
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "contractSafeTransferFromERC20",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "bytes32",
				name: "adminRole",
				type: "bytes32",
			},
		],
		name: "setRoleAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "balanceOfUnderlyingInContract",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "claimReward",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "toReferrer",
				type: "address",
			},
		],
		name: "addRefferrer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "toReferrer",
				type: "address",
			},
		],
		name: "addRefferrerAndAirdrop",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "payable",
		type: "function",
		payable: true,
	},
	{
		inputs: [],
		name: "airDrop",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "payable",
		type: "function",
		payable: true,
	},
	{
		inputs: [],
		name: "ido",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "payable",
		type: "function",
		payable: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "Token",
				type: "address",
			},
		],
		name: "setDropUnderlying",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "n",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "m",
				type: "uint256",
			},
		],
		name: "setDropParameters",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "selfDestroy",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

App = {
	web3Provider: null,
	contracts: {},

	init: function () {
		App.initWeb3();
	},

	// 初始化web3s实例 后 实例化合约 并 获取合约 渲染数据 交互合约 渲染数据 监听合约事件 添加事件绑定。
	initWeb3: async function () {
		if (window.ethereum) {
			provider = new ethers.providers.Web3Provider(window.ethereum, "any");

			//切换网络，添加网络。
			try {
				console.log("请求切换网络...");
				// check if the chain to connect to is installed
				await window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x3" }], // chainId must be in hexadecimal numbers
				});
			} catch (error) {
				// This error code indicates that the chain has not been added to MetaMask
				// if it is not, then install it into the user MetaMask
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							params: [
								{
									method: "wallet_addEthereumChain",
									chainId: "0x56",
									chainName: "Binance Smart Chain - Mainnet",
									nativeCurrency: {
										name: "Binance",
										symbol: "BNB", // 2-6 characters long
										decimals: 18,
									},
									blockExplorerUrls: "https://bscscan.com/",
								},
							],
						});
					} catch (addError) {
						console.error(addError);
					}
				} else {
					//未能切换到网络的处理
					console.error(error);
					App.handleNetErr();
					return;
				}
			}

			// // 弹出启动MetaMask
			try {
				console.log("请求开启MetaMask,请求获取getSigner...");
				await window.ethereum.enable();
				signer = await provider.getSigner();
				// userAddress = await signer.getAddress();
			} catch (error) {
				console.error("User denied account access");
			}
		} else if (typeof web3 !== "undefined") {
			// App.web3Provider = web3.currentProvider;
			// web3 = new Web3(App.web3Provider);
		} else {
			// App.web3Provider = new Web3.providers.HttpProvider("http://localhost:9545");
			// web3 = new Web3(App.web3Provider);
		}

		return App.initAccounts(); //实例化合约 并 获取合约 渲染数据 交互合约 渲染数据 监听合约事件 添加事件绑定。
	},

	handleNetErr: async function () {
		$("#walletbutton").html("<span>" + "Net Error" + "</span>");
	},

	// 初始化账户
	initAccounts: async function () {
		// accounts = await web3.eth.getAccounts();
		// defaultAccount = accounts[0];

		console.log("请求获取账户...");
		await window.ethereum
			.request({ method: "eth_accounts" })
			.then(App.updateAccounts)
			.catch((err) => {
				console.error(err);
			});

		console.log("初始化账户完成...");

		// 链更改 事件处理
		ethereum.on("chainChanged", App.handleChainChanged);

		//账户更改 事件处理
		ethereum.on("accountsChanged", App.handleAccountsChanged);

		await App.updateConnectButtonsAndRef();

		return App.initContract();
	},

	// 处理链更改
	handleChainChanged: function (_chainId) {
		//我们建议重新加载页面，除非你必须这样做
		window.location.reload();
	},

	// 处理账户更改
	handleAccountsChanged: function (accounts_) {
		App.updateAccounts(accounts_);
		App.updateConnectButtonsAndRef();
		App.bindEvents();
	},

	// 处理更新账户变量等
	updateAccounts: function (accounts_) {
		if (accounts_.length === 0) {
			// MetaMask被锁定或用户没有连接任何帐户
			console.log("请链接MetaMask, Please connect to MetaMask.");

			accounts = accounts_;
			currentAccount = accounts_[0];
			console.log("Account账户更新为:", accounts);
			console.log("currentAccount当前账户更新为:", currentAccount);

			// App.updateConnectButtonsAndRef();
		} else if (accounts_[0] != currentAccount) {
			// 更新变量 currentAccount当前账户
			accounts = accounts_;
			currentAccount = accounts_[0];
			console.log("Account账户更新为:", accounts);
			console.log("currentAccount当前账户更新为:", currentAccount);
			// 继续做其他工作!
			// window.location.reload();
		}
	},

	// 处理钱包链接按钮 和 推广链接
	updateConnectButtonsAndRef: async function () {
		console.log("开始更新账户链接按钮 和 推广链接页面...");

		// 链接钱包的类处理 删除类后点击则不会出现链接选择框
		if (accounts.length > 0) {
			$("#enter_amount_or_buy_ido").removeClass("show_connect_wallet");
			$("#walletbutton").removeClass("show_connect_wallet");
			$("#claim_airDrop").removeClass("show_connect_wallet");
			console.log("删除 钱包选项类 完成...");
		} else {
			$("#enter_amount_or_buy_ido").addClass("show_connect_wallet");
			$("#walletbutton").addClass("show_connect_wallet");
			$("#claim_airDrop").addClass("show_connect_wallet");
			console.log("注意：重置添加/未删除 钱包选项类!");
		}

		// 链接钱包的文字更改为相应 ido 或 空投 或 账户地址 等。
		if (accounts.length > 0) {
			// ido的按钮处理
			$("#enter_amount_or_buy_ido").html(
				'<i class="fa fa-check-square"></i> BUY $MetaUFO NOW'
			);

			// claimAirdrop的按钮处理
			$("#claim_airDrop").html('<i class="fa fa-globe"></i> Claim Airdrop');

			// 右上角钱包账户 和 余额 的处理
			let acc1 =
				"<span>" +
				accounts[0].substr(0, 4) +
				"****" +
				accounts[0].substr(accounts[0].length - 4, accounts[0].length) +
				"</span>";
			$("#walletbutton").html(acc1);

			// bal0 = await web3.eth.getBalance(accounts[0]);
			// bal0 = await web3.utils.fromWei(bal0 + "");
			bal0 = await provider.getBalance(accounts[0]);
			bal0 = await ethers.utils.formatEther(bal0);
			// console.log(typeof bal0);
			bal0 = parseFloat(bal0).toFixed(2);
			// bal0 = bal0.toFixed(2);
			$("#bal").html(bal0 + " BNB");

			console.log("账户余额处理完成...");
		} else {
			// ido的按钮处理
			$("#enter_amount_or_buy_ido").html(
				'<i class="fa fa-check-square"></i> CONNECT WALLET'
			);

			// claimAirdrop的按钮处理
			$("#claim_airDrop").html('<i class="fa fa-globe"></i> CONNECT WALLET');

			// 右上角钱包账户 和 余额 的处理

			$("#walletbutton").html("Connect");
			$("#bal").html(0.0 + " BNB");

			console.log("注意：账户余额 已重置/未处理完成!");
		}

		// 推广链接处理
		if (accounts.length > 0) {
			let acc1 =
				"<span>" +
				accounts[0].substr(0, 4) +
				"****" +
				accounts[0].substr(accounts[0].length - 4, accounts[0].length) +
				"</span>";
			let str111;
			str111 = location.hostname;
			str111 = "https://" + str111 + "/#/buy/" + acc1;
			$("#refaddress").html(str111);

			console.log("推广链接 更新插入 处理完成...");

			// $("#showcopy").empty();  //先清空 再添加，否则再切换账户的时候形成多个插入copy按钮。
			$("#showcopy")
				.empty()
				.append('<a class="btn btn-info black"><i class="fa fa-copy"></i> Copy</a>');

			// 推广链接的复制按钮处理
			let copyText = "https://" + location.hostname + "/#/buy/" + accounts[0];
			$("#showcopy a").click(function copy() {
				navigator.clipboard.writeText(copyText).then(
					function () {
						alert("clipboard successfully set: \n" + copyText);
					},
					function () {
						alert("clipboard write failed");
					}
				);
			});

			console.log("推广链接COPY按钮及功能 处理完成...");
		} else {
			console.log("注意：推广链接 OR 复制按钮 已重置/未处理完成!");
		}

		console.log("完成更新账户链接按钮 和 推广链接页面...");
	},

	// 总体功能集成:  实例化合约 并 获取合约 渲染数据 交互合约 渲染数据 监听合约事件 添加事件绑定。
	// 初始化合约实例 并 获取合约渲染主页数据、监听合约事件获取信息渲染数据、添加绑定事件处理：更改链上数据 后 获取数据并渲染主页。
	initContract: function () {
		// MetaET 和 DropTokens 的两个合约实例化。

		console.log("开始实例化合约...");
		// var contract = new ethers.Contract(contractAddress, abi, provider);

		// https://ropsten.etherscan.io/address/0xd4ac0413983a01ab890a02990230a2a8eff00c38
		// App.contracts.MetaET = new web3.eth.Contract(abi_MetaET, address_MetaET);
		App.contracts.MetaET = new ethers.Contract(address_MetaET, abi_MetaET, signer);

		// https://ropsten.etherscan.io/address/0x92de0ff19899f575662a11fe05aa5dbbf5dbbf9a
		// App.contracts.DropTokens = new web3.eth.Contract(abi_DropTokens, address_DropTokens);
		App.contracts.DropTokens = new ethers.Contract(address_DropTokens, abi_DropTokens, signer);

		console.log("完成实例化合约...");

		App.updateContractData(); // updateContractData() 获取合约信息，后根据合约链上数据 更改渲染主页数据。

		App.bindEvents(); // bindEvents() 绑定事件 给提交按钮 来更改合约链上数据、获取链上数据、更新渲染主页数据。
	},

	// updateContractData() 获取合约信息，后根据合约链上数据 更改渲染主页数据。
	updateContractData: async function () {
		console.log("开始更新合约数据页面...");

		let users = await App.contracts.DropTokens.referral(accounts[0]);
		$("#valp").html(users.invited + " Users" + "测试");
		$("#rewardNum").html(users.reward + " MetaET" + "测试");

		console.log("完成更新合约数据页面...");
		console.log("测试合约交互... 输出 users.invited", users.invited);
	},

	bindEvents_front: function () {
		// keyup 键盘抬起事件
		$("#enter_Amount").keyup(function () {
			$("#to_receive").attr("placeholder", this.value * 10e4);
			$("#to_receive").text(this.value * 10e4);
		});

		// 显示 选择钱包选项. class = "show_connect_wallet"
		// $("#enter_amount_or_buy_ido, #walletbutton, #claim_airDrop").click(function(){
		$(".show_connect_wallet").click(function () {
			console.log("点击了.show_connect_wallet类，移除属性hidden,显示钱包选项。");
			$("#select_wallet").removeAttr("hidden");
			return false;
		});

		// 隐藏 选择钱包容器. 整个文档点击事件
		$(document).click(function () {
			$("#select_wallet").attr("hidden", "hidden");
		});

		// 排除隐藏 选择钱包容器内的 钱包选项 的元素点击事件, 即点击此元素以外的元素执行隐藏事件。
		$("#select_wallet_box").click(function () {
			// window.location.reload();  //使用重新载入来刷新。
			return false; //关键是这里，阻止冒泡
		});

		// 链接钱包选项弹出后 选择指定钱包的 点击事件操作
		$("#connect_MetaMask,#connect_binance,#connect_Trust,#connect_Math").click(
			async function () {
				console.log("点击了#connect_MetaMask...");
				$("#select_wallet").attr("hidden", "hidden");

				// App.initWeb3();

				// // 弹出启动MetaMask
				try {
					console.log("请求开启MetaMask,请求获取getSigner...");
					await window.ethereum.enable();
					signer = await provider.getSigner();
					// userAddress = await signer.getAddress();
				} catch (error) {
					console.error("User denied account access");
				}

				// return false;
			}
		);

		console.log("绑定前置事件完成...");
	},

	// bindEvents() 绑定事件 给提交按钮 来更改合约链上数据、获取链上数据、更新渲染主页数据。
	bindEvents: function () {
		App.bindEvents_front();

		// 0. 右上角钱包登录按钮 id = walletbutton
		$("#walletbutton").unbind("click");
		$("#walletbutton").click(function () {
			if (accounts.length > 0) {
				console.log("已经链接了钱包");
			} else {
				// 这里进行 链接钱包的操作。
				console.log("点击了 右上角Connect 链接钱包按钮");
				$("#select_wallet").removeAttr("hidden");
				return false;
			}
		});

		// 1. 点击 BuyIDO的购买ido 的按钮逻辑
		$("#enter_amount_or_buy_ido").unbind("click");
		$("#enter_amount_or_buy_ido")
			// $("#enter_amount_or_buy_ido:not(.show_connect_wallet)")
			// .not(".show_connect_wallet")
			.click(function () {
				if (accounts.length > 0) {
					console.log("点击了ido购买按钮");

					let value_ = $("#enter_Amount").val();
					if (value_ > 0) {
						// App.contracts.DropTokens.methods
						App.contracts.DropTokens.ido({
							value: ethers.utils.parseEther(value_),
						}).then(console.log);
					} else {
						alert("请输入正确的购买金额");
					}
				} else {
					console.log("移除hidden");
					$("#select_wallet").removeAttr("hidden");
					return false;
				}
			});

		// 2. 点击 JOIN AIRDROP领取空投 的按钮逻辑
		$("#claim_airDrop").unbind("click");
		$("#claim_airDrop")
			// .not(".show_connect_wallet")
			.click(function () {
				if (accounts.length > 0) {
					console.log("点击了领取空投按钮");

					var refer_hash = window.location.hash;
					var refer_addr_arry = refer_hash.split("/");

					function check_refer_addr(arrays) {
						let addr_;
						for (i = 0; i < arrays.length; i++) {
							if (arrays[i].startsWith("0x")) {
								addr_ = arrays[i];
							}
						}
						return addr_;
					}
					// 获取主页url里的#锚点后的推荐地址
					var refer_addr = check_refer_addr(refer_addr_arry);

					// 获取链上数据 _msg.sender() 是否已经领取空投
					// let airdroped = await App.contracts.DropTokens.airdroped(
					App.contracts.DropTokens.airdroped(address_MetaET, accounts[0]).then(
						// 如果Q获取到推荐地址，则执行 addRefferrerAndAirdrop 添加推荐人并领取空投
						function (airdroped_) {
							if (!airdroped_) {
								if (refer_addr != null) {
									App.contracts.DropTokens.addRefferrerAndAirdrop(
										refer_addr
									).then(console.log);
								} else {
									App.contracts.DropTokens.airDrop().then(console.log);
								}
							} else {
								alert("Only one airdrop can be claimed per account.");
							}
						}
					);
				} else {
					$("#select_wallet").removeAttr("hidden");
					console.log("移除hidden");
					return false;
				}
				// 这里进行 交互领取空投 的操作。
			});

		// 3. 点击 ClaimRewad领取推荐奖励 的按钮逻辑
		$("#ClaimRewad_Butten").unbind("click");
		$("#ClaimRewad_Butten").click(async function () {
			console.log("点击了领取推荐奖励按钮");

			if (accounts.length > 0) {
				let users = await App.contracts.DropTokens.referral(accounts[0]);
				if (users.reward > 0) {
					App.contracts.DropTokens.claimReward().then(console.log);
				} else {
					alert("请复制推广链接并转发给你的朋友，当他领取空投后，你会获得奖励.");
				}

				App.updateContractData();

				// 这里进行 领取推荐奖励的交互操作。
			} else {
				alert("请首先连接钱包，然后执行操作...");
			}
		});

		console.log("绑定事件完成...");
	},
};

$(function () {
	$(window).load(function () {
		// App.bindEvents_front	();
		App.init();
	});
});
