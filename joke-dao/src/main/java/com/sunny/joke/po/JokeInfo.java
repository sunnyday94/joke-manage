package com.sunny.joke.po;

import java.util.Date;

public class JokeInfo {
    private Long id;

    private String jokeName;

    private String jokeContent;
    
    private Long jokeTypeId;

    private Long uploadUserId;

    private Date createTime;

    private Date updateTime;

    private Date delTime;
    
    private String delFlag;

    private String remark;
    
    private Manager manager;
    
    private String createTimeStr;
    
    private String updateTimeStr;
    
    private JokeType jokeType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJokeName() {
        return jokeName;
    }

    public void setJokeName(String jokeName) {
        this.jokeName = jokeName;
    }

    public String getJokeContent() {
        return jokeContent;
    }

    public void setJokeContent(String jokeContent) {
        this.jokeContent = jokeContent;
    }

    public Long getUploadUserId() {
        return uploadUserId;
    }

    public void setUploadUserId(Long uploadUserId) {
        this.uploadUserId = uploadUserId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getDelTime() {
        return delTime;
    }

    public void setDelTime(Date delTime) {
        this.delTime = delTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

	public Long getJokeTypeId() {
		return jokeTypeId;
	}

	public void setJokeTypeId(Long jokeTypeId) {
		this.jokeTypeId = jokeTypeId;
	}

	public Manager getManager() {
		return manager;
	}

	public void setManager(Manager manager) {
		this.manager = manager;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public JokeType getJokeType() {
		return jokeType;
	}

	public void setJokeType(JokeType jokeType) {
		this.jokeType = jokeType;
	}

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

	public String getUpdateTimeStr() {
		return updateTimeStr;
	}

	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
	}
    
    
}