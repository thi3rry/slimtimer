import Modal from "./Modal";
import {useState} from "preact/hooks";

export default function TaskExporter({tasks, updateTasks}) {

    const [currentExportedTasks, setCurrentExportedTasks] = useState(JSON.stringify([...tasks]));
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [importMerge, setImportMerge] = useState(true);
    return (
        <>
            <button type="button" onClick={() => {
                setCurrentExportedTasks(JSON.stringify([...tasks]));
                setExportModalVisible(true);
            }}>Export / Import</button>
            <Modal title={"Export / Import"} show={exportModalVisible} onHide={() => setExportModalVisible(false)}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let updatedTasks = JSON.parse(currentExportedTasks);
                    let currentTasks = JSON.stringify([...tasks]);
                    let sameAsLocal = currentExportedTasks === currentTasks;
                    let differentFromLocal = currentExportedTasks !== currentTasks;
                    if (importMerge) {
                        let sameConfirm = true;
                        if (sameAsLocal && importMerge) {
                            sameConfirm = confirm('No changes are detected to import. By merging, you are about to create duplicates. Are you sure you want to merge ? ');
                        }
                        if (sameConfirm) {
                            updateTasks([...tasks, ...updatedTasks]);
                            setExportModalVisible(false);
                        }
                    }
                    else if (!importMerge) {
                        let eraseConfirm = sameAsLocal;
                        if (!importMerge && differentFromLocal) {
                            eraseConfirm = confirm('Are you sure you want to import these values ? ');
                        }
                        if (eraseConfirm) {
                            updateTasks([...updatedTasks]);
                            setExportModalVisible(false);
                        }
                    }
                    return false;
                }}>
                    <p>
                                <textarea
                                    rows={10}
                                    cols={50}
                                    class="w-10/12"
                                    name="importValue"
                                    id="importValue"
                                    value={currentExportedTasks}
                                    onInput={(e) => setCurrentExportedTasks(e.target.value)}
                                ></textarea>
                    </p>
                    <p>
                        <button type="button" onClick={() => navigator.clipboard.writeText(currentExportedTasks)}>Copy to clipboard</button>
                        <button type="submit" onClick={(e) => setImportMerge(true)}>Importer en ajoutant</button>
                        <button type="submit" onClick={(e) => setImportMerge(false)}>Importer en écrasant</button>
                    </p>
                </form>

            </Modal>
        </>
    )
}
