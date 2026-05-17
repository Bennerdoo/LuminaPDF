package lumina.software.proprietary.security.service;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang3.tuple.Pair;

import lumina.software.common.model.FileInfo;
import lumina.software.common.model.exception.UnsupportedProviderException;

public interface DatabaseServiceInterface {
    void exportDatabase() throws SQLException, UnsupportedProviderException;

    void importDatabase();

    boolean hasBackup();

    List<FileInfo> getBackupList();

    List<Pair<FileInfo, Boolean>> deleteAllBackups();

    List<Pair<FileInfo, Boolean>> deleteLastBackup();
}
