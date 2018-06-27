package com.sunny.joke.test;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReadExcel {
	
	/**
	 * 日志信息
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(ReadExcel.class);

	public static void main(String[] args) {
		File file = new File("D:/1.xls"); 
		if (!file.exists()) {
			System.out.println("文件不存在");
		}
		readExcelContent(file);
	}

	/**
	 * 
	 * @description: <p class="detail">读取Excel内容</p>
	 * @author: <a href="mailto:wangqingtian@chunmi.com ">wangqingtian</a>
	 * @date: 2017年10月12日-下午4:21:36
	 * @param @param file
	 * @return void
	 */
	public static void readExcelContent(File file) {
		try {
			InputStream inputStream = new FileInputStream(file);
			String fileName = file.getName();
			Workbook wb = null;		
			if(ReadExcel.isExcel2003(fileName)){				
				wb = new HSSFWorkbook(inputStream);// 解析xls格式
			}else if (ReadExcel.isExcel2007(fileName)){
				wb = new XSSFWorkbook(inputStream);// 解析xlsx格式
			}
			Sheet sheet = wb.getSheetAt(0);// 第一个工作表 ，第二个则为1，以此类推...

			int firstRowIndex = sheet.getFirstRowNum(); //获取第一行(从0开始)
			int lastRowIndex = sheet.getLastRowNum();   //获取最后一行(从0开始)
			
			//从第二行开始
			for (int rIndex = firstRowIndex + 1; rIndex <= lastRowIndex; rIndex++) {
				Row row = sheet.getRow(rIndex);
				if (row != null) {
					int firstCellIndex = row.getFirstCellNum();  //获取第一个单元格(从0开始)
					int lastCellIndex = row.getLastCellNum();    //获取最后一个单元格(从1开始)
					// 此处参数cIndex决定可以取到excel的列数。
					for (int cIndex = firstCellIndex; cIndex < lastCellIndex; cIndex++) {
						Cell cell = row.getCell(cIndex);
						String value = "";
						if (cell != null) {
							value = cell.toString();
							System.out.println(value);
						}
					}
				}
			
			}
		} catch (FileNotFoundException e) {
			LOGGER.info("读取的文件不存在!");
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		}
	}

	public static boolean isExcel2003(String filePath) {
		return filePath.matches("^.+\\.(?i)(xls)$");

	}

	public static boolean isExcel2007(String filePath) {
		return filePath.matches("^.+\\.(?i)(xlsx)$");
	}
}
