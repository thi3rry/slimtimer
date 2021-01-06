import Modal from "./Modal";
import {useState} from "preact/hooks";

export default function TaskExporter({tasks, updateTasks}) {

    const [currentExportedTasks, setCurrentExportedTasks] = useState(JSON.stringify(tasks));
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [importMerge, setImportMerge] = useState(true);

    return (
        <>
            <button onClick={() => {
                setCurrentExportedTasks(JSON.stringify(tasks));
                setExportModalVisible(true);
            }}>Export / Import</button>
            <Modal title={"Export / Import"} show={exportModalVisible} onHide={() => setExportModalVisible(false)}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const updatedTasks = JSON.parse(e.target.importValue.value);
                    let sameConfirm = !(e.target.importValue.value !== null && currentExportedTasks !== e.target.importValue.value);
                    if (sameConfirm && importMerge) {
                        sameConfirm = confirm('No changes are detected to import. By merging, you are about to create duplicates. Are you sure you want to merge ? ');
                    }
                    if (importMerge && sameConfirm) {
                        updateTasks([...tasks, ...updatedTasks]);
                    }
                    else if (!importMerge) {
                        updateTasks(updatedTasks);
                    }
                    setExportModalVisible(false);
                    return false;
                }}>
                    <p>
                                <textarea
                                    rows={10}
                                    cols={50}
                                    class="w-10/12"
                                    name="importValue"
                                    onClick={(e) => {
                                        e.target.setSelectionRange(0, e.target.value.length)
                                    }}
                                >{currentExportedTasks}</textarea>
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
