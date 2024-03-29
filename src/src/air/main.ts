/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.11.9-release-please-1c9388a-1275-1
 *
 */
import type { IFluenceClient as IFluenceClient$$, CallParams as CallParams$$ } from '@fluencelabs/js-client.api';
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$,
} from '@fluencelabs/js-client.api';
    


// Services

// Functions
export const helloWorldRemote_script = `
                    (seq
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "name") [] name)
                      )
                      (xor
                       (xor
                        (seq
                         (seq
                          (call -relay- ("op" "concat_strings") ["Hello, " name] concat_strings)
                          (call -relay- ("op" "concat_strings") [concat_strings "! From "] from_msg)
                         )
                         (call -relay- ("op" "concat_strings") [from_msg -relay-] from_peer_msg)
                        )
                        (fail %last_error%)
                       )
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 0])
                      )
                     )
                     (call %init_peer_id% ("callbackSrv" "response") [from_peer_msg])
                    )
    `
 

export function helloWorldRemote(
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorldRemote(
    peer: IFluenceClient$$,
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorldRemote(...args: any) {


    return callFunction$$(
        args,
        {
    "functionName" : "helloWorldRemote",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "name" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "scalar",
                    "name" : "string"
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        helloWorldRemote_script
    )
}

export const getInfo_script = `
                    (seq
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (xor
                        (call -relay- ("peer" "identify") [] info)
                        (fail %last_error%)
                       )
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 0])
                      )
                     )
                     (call %init_peer_id% ("callbackSrv" "response") [info -relay-])
                    )
    `
 
export type GetInfoResult = [{ air_version: string; allowed_binaries: string[]; external_addresses: string[]; node_version: string; spell_version: string; }, string]
export function getInfo(
    config?: {ttl?: number}
): Promise<GetInfoResult>;

export function getInfo(
    peer: IFluenceClient$$,
    config?: {ttl?: number}
): Promise<GetInfoResult>;

export function getInfo(...args: any) {


    return callFunction$$(
        args,
        {
    "functionName" : "getInfo",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "struct",
                    "name" : "Info",
                    "fields" : {
                        "node_version" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "spell_version" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "external_addresses" : {
                            "tag" : "array",
                            "type" : {
                                "tag" : "scalar",
                                "name" : "string"
                            }
                        },
                        "allowed_binaries" : {
                            "tag" : "array",
                            "type" : {
                                "tag" : "scalar",
                                "name" : "string"
                            }
                        },
                        "air_version" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                {
                    "tag" : "scalar",
                    "name" : "string"
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        getInfo_script
    )
}

export const runDeployedServices_script = `
                    (seq
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (xor
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (par
                               (call %init_peer_id% ("json" "obj") ["defaultWorker" []] GetWorkersInfoDeals_obj)
                               (call %init_peer_id% ("json" "obj") ["defaultWorker" []] GetWorkersInfoHosts_obj)
                              )
                              (call %init_peer_id% ("json" "obj") ["deals" GetWorkersInfoDeals_obj "hosts" GetWorkersInfoHosts_obj] GetWorkersInfo_obj)
                             )
                             (ap GetWorkersInfo_obj.$.deals GetWorkersInfo_obj_flat)
                            )
                            (ap GetWorkersInfo_obj_flat.$.defaultWorker GetWorkersInfo_obj_flat_flat)
                           )
                           (ap GetWorkersInfo_obj_flat_flat.$.[0].dealId GetWorkersInfo_obj_flat_flat_flat)
                          )
                          (new $records
                           (new $successful
                            (new $result
                             (seq
                              (seq
                               (xor
                                (seq
                                 (seq
                                  (seq
                                   (seq
                                    (seq
                                     (seq
                                      (call -relay- ("insecure_sig" "get_peer_id") [] peer_id)
                                      (call -relay- ("registry" "get_key_id") [GetWorkersInfo_obj_flat_flat_flat peer_id] key_id)
                                     )
                                     (call -relay- ("op" "string_to_b58") [key_id] k)
                                    )
                                    (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                                   )
                                   (par
                                    (fold nodes n-0
                                     (par
                                      (xor
                                       (xor
                                        (seq
                                         (seq
                                          (call n-0 ("peer" "timestamp_sec") [] t)
                                          (call n-0 ("registry" "get_records") [key_id t] get_result)
                                         )
                                         (xor
                                          (seq
                                           (match get_result.$.success true
                                            (seq
                                             (ap get_result.$.result $records)
                                             (ap true $successful)
                                            )
                                           )
                                           (new $-ephemeral-stream-
                                            (new #-ephemeral-canon-
                                             (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                                            )
                                           )
                                          )
                                          (seq
                                           (ap get_result.$.error $error)
                                           (new $-ephemeral-stream-
                                            (new #-ephemeral-canon-
                                             (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                                            )
                                           )
                                          )
                                         )
                                        )
                                        (null)
                                       )
                                       (fail %last_error%)
                                      )
                                      (next n-0)
                                     )
                                     (never)
                                    )
                                    (null)
                                   )
                                  )
                                  (new $status
                                   (new $result-0
                                    (seq
                                     (seq
                                      (seq
                                       (par
                                        (seq
                                         (seq
                                          (seq
                                           (call -relay- ("math" "sub") [2 1] sub)
                                           (new $successful_test
                                            (seq
                                             (seq
                                              (seq
                                               (call -relay- ("math" "add") [sub 1] successful_incr)
                                               (fold $successful successful_fold_var
                                                (seq
                                                 (seq
                                                  (ap successful_fold_var $successful_test)
                                                  (canon -relay- $successful_test  #successful_iter_canon)
                                                 )
                                                 (xor
                                                  (match #successful_iter_canon.length successful_incr
                                                   (null)
                                                  )
                                                  (next successful_fold_var)
                                                 )
                                                )
                                                (never)
                                               )
                                              )
                                              (canon -relay- $successful_test  #successful_result_canon)
                                             )
                                             (ap #successful_result_canon successful_gate)
                                            )
                                           )
                                          )
                                          (call -relay- ("math" "sub") [2 1] sub-0)
                                         )
                                         (ap "ok" $status)
                                        )
                                        (call -relay- ("peer" "timeout") [6000 "timeout"] $status)
                                       )
                                       (new $status_test
                                        (seq
                                         (seq
                                          (seq
                                           (call -relay- ("math" "add") [0 1] status_incr)
                                           (fold $status status_fold_var
                                            (seq
                                             (seq
                                              (ap status_fold_var $status_test)
                                              (canon -relay- $status_test  #status_iter_canon)
                                             )
                                             (xor
                                              (match #status_iter_canon.length status_incr
                                               (null)
                                              )
                                              (next status_fold_var)
                                             )
                                            )
                                            (never)
                                           )
                                          )
                                          (canon -relay- $status_test  #status_result_canon)
                                         )
                                         (ap #status_result_canon status_gate)
                                        )
                                       )
                                      )
                                      (xor
                                       (match status_gate.$.[0] "ok"
                                        (ap true $result-0)
                                       )
                                       (ap false $result-0)
                                      )
                                     )
                                     (new $result-0_test
                                      (seq
                                       (seq
                                        (seq
                                         (call -relay- ("math" "add") [0 1] result-0_incr)
                                         (fold $result-0 result-0_fold_var
                                          (seq
                                           (seq
                                            (ap result-0_fold_var $result-0_test)
                                            (canon -relay- $result-0_test  #result-0_iter_canon)
                                           )
                                           (xor
                                            (match #result-0_iter_canon.length result-0_incr
                                             (null)
                                            )
                                            (next result-0_fold_var)
                                           )
                                          )
                                          (never)
                                         )
                                        )
                                        (canon -relay- $result-0_test  #result-0_result_canon)
                                       )
                                       (ap #result-0_result_canon result-0_gate)
                                      )
                                     )
                                    )
                                   )
                                  )
                                 )
                                 (xor
                                  (match result-0_gate.$.[0] false
                                   (ap "timeout exceeded" $error)
                                  )
                                  (seq
                                   (seq
                                    (canon -relay- $records  #records_canon)
                                    (call -relay- ("registry" "merge") [#records_canon] merged)
                                   )
                                   (xor
                                    (match merged.$.success false
                                     (ap merged.$.error $error)
                                    )
                                    (ap merged.$.result $result)
                                   )
                                  )
                                 )
                                )
                                (fail %last_error%)
                               )
                               (canon %init_peer_id% $result  #-result-fix-0)
                              )
                              (ap #-result-fix-0 -result-flat-0)
                             )
                            )
                           )
                          )
                         )
                         (fold -result-flat-0.$.[0] w-0
                          (seq
                           (xor
                            (seq
                             (seq
                              (seq
                               (seq
                                (seq
                                 (seq
                                  (new $-ephemeral-stream-
                                   (new #-ephemeral-canon-
                                    (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                                   )
                                  )
                                  (fold w-0.$.metadata.relay_id -via-peer-
                                   (seq
                                    (new $-ephemeral-stream-
                                     (new #-ephemeral-canon-
                                      (canon -via-peer- $-ephemeral-stream-  #-ephemeral-canon-)
                                     )
                                    )
                                    (next -via-peer-)
                                   )
                                  )
                                 )
                                 (call w-0.$.metadata.peer_id ("myService" "greeting") ["fluence"] answer)
                                )
                                (call w-0.$.metadata.peer_id ("json" "obj") ["answer" answer "peer" w-0.$.metadata.relay_id.[0]] Answer_obj)
                               )
                               (ap Answer_obj $answers)
                              )
                              (fold w-0.$.metadata.relay_id -via-peer-
                               (seq
                                (next -via-peer-)
                                (new $-ephemeral-stream-
                                 (new #-ephemeral-canon-
                                  (canon -via-peer- $-ephemeral-stream-  #-ephemeral-canon-)
                                 )
                                )
                               )
                              )
                             )
                             (new $-ephemeral-stream-
                              (new #-ephemeral-canon-
                               (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                              )
                             )
                            )
                            (seq
                             (seq
                              (seq
                               (fold w-0.$.metadata.relay_id -via-peer-
                                (seq
                                 (new $-ephemeral-stream-
                                  (new #-ephemeral-canon-
                                   (canon -via-peer- $-ephemeral-stream-  #-ephemeral-canon-)
                                  )
                                 )
                                 (next -via-peer-)
                                )
                               )
                               (new $-ephemeral-stream-
                                (new #-ephemeral-canon-
                                 (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                                )
                               )
                              )
                              (new $-ephemeral-stream-
                               (new #-ephemeral-canon-
                                (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
                               )
                              )
                             )
                             (fail %last_error%)
                            )
                           )
                           (next w-0)
                          )
                         )
                        )
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 0])
                       )
                      )
                      (canon %init_peer_id% $answers  #answers_canon)
                     )
                     (call %init_peer_id% ("callbackSrv" "response") [#answers_canon])
                    )
    `
 

export function runDeployedServices(
    config?: {ttl?: number}
): Promise<{ answer: string; peer: string; }[]>;

export function runDeployedServices(
    peer: IFluenceClient$$,
    config?: {ttl?: number}
): Promise<{ answer: string; peer: string; }[]>;

export function runDeployedServices(...args: any) {


    return callFunction$$(
        args,
        {
    "functionName" : "runDeployedServices",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "struct",
                        "name" : "Answer",
                        "fields" : {
                            "answer" : {
                                "tag" : "scalar",
                                "name" : "string"
                            },
                            "peer" : {
                                "tag" : "scalar",
                                "name" : "string"
                            }
                        }
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        runDeployedServices_script
    )
}

export const helloWorld_script = `
                    (seq
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "name") [] name)
                      )
                      (xor
                       (call %init_peer_id% ("op" "concat_strings") ["Hello, " name] concat_strings)
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 0])
                      )
                     )
                     (call %init_peer_id% ("callbackSrv" "response") [concat_strings])
                    )
    `
 

export function helloWorld(
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(
    peer: IFluenceClient$$,
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(...args: any) {


    return callFunction$$(
        args,
        {
    "functionName" : "helloWorld",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "name" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "scalar",
                    "name" : "string"
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        helloWorld_script
    )
}

export const getInfos_script = `
                    (seq
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "peers") [] peers)
                      )
                      (xor
                       (new $infos
                        (seq
                         (seq
                          (fold peers p-0
                           (seq
                            (xor
                             (seq
                              (seq
                               (new $-ephemeral-stream-
                                (new #-ephemeral-canon-
                                 (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                                )
                               )
                               (call p-0 ("peer" "identify") [] $infos)
                              )
                              (new $-ephemeral-stream-
                               (new #-ephemeral-canon-
                                (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                               )
                              )
                             )
                             (seq
                              (seq
                               (new $-ephemeral-stream-
                                (new #-ephemeral-canon-
                                 (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
                                )
                               )
                               (new $-ephemeral-stream-
                                (new #-ephemeral-canon-
                                 (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
                                )
                               )
                              )
                              (fail %last_error%)
                             )
                            )
                            (next p-0)
                           )
                          )
                          (canon %init_peer_id% $infos  #-infos-fix-0)
                         )
                         (ap #-infos-fix-0 -infos-flat-0)
                        )
                       )
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 0])
                      )
                     )
                     (call %init_peer_id% ("callbackSrv" "response") [-infos-flat-0])
                    )
    `
 

export function getInfos(
    peers: string[],
    config?: {ttl?: number}
): Promise<{ air_version: string; allowed_binaries: string[]; external_addresses: string[]; node_version: string; spell_version: string; }[]>;

export function getInfos(
    peer: IFluenceClient$$,
    peers: string[],
    config?: {ttl?: number}
): Promise<{ air_version: string; allowed_binaries: string[]; external_addresses: string[]; node_version: string; spell_version: string; }[]>;

export function getInfos(...args: any) {


    return callFunction$$(
        args,
        {
    "functionName" : "getInfos",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "peers" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "struct",
                        "name" : "Info",
                        "fields" : {
                            "node_version" : {
                                "tag" : "scalar",
                                "name" : "string"
                            },
                            "spell_version" : {
                                "tag" : "scalar",
                                "name" : "string"
                            },
                            "external_addresses" : {
                                "tag" : "array",
                                "type" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            },
                            "allowed_binaries" : {
                                "tag" : "array",
                                "type" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            },
                            "air_version" : {
                                "tag" : "scalar",
                                "name" : "string"
                            }
                        }
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        getInfos_script
    )
}

/* eslint-enable */